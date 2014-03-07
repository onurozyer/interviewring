/* ***************************************************************
This is a JavaScript Library that contains a variety of functions
that support encryption efforts.  Everything from data obfuscation
functions, to Pseudo Random Number Generators, to hash functions.

This is a major effort to create alternatives to Cryptographically
Secure pseudo-random number Generators (CSGs).  I have several
examples of alternate techniques.
*************************************************************** */

                      /* GLOBAL CONSTANTS */
       /* ***** First, we have true global constants ***** */
B64 =                  // for doing base-64 I/O to a page
"0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ+/";


/* ****************************************************************
This next part contains globals that the user may change to
affect the way the RASCAL system works.  Changing any of these values
will alter the encrypted output given the same keys and plain-text
input.

A good idea is to set these to your unique values before using the
RASCAL system, and then modifying them periodically. Changing a single
character will produce an entirely different output from the system.
**************************************************************** */

/* *****************************************************************
This is a "hidden" key value that makes your encryptions unique
to you.  It makes your encryptions different from those of other
users when they use the same keyboard values against similar text.

It should have a length of about 60 characters (480 bit encryption.)
Of course, everyone you send encrypted msgs to must also have this
exact same hidden key.  A good idea is to change it periodically
by doing something like I did here by including the date.  This
also protects you from accidently using the same regular keys - if
you change it every month, then you only have to be unique with your
regular keys for a month at a time.  This functions as a Master Key.
****************************************************************** */
var SubGenKey = "September 2010 - This is my private key string.";

/* ******************************************************************
These next values modify the user-entered key values, and make them
unique to your version of this code.  If you make these values unique
to you, then your entering the same key/s as someone else shall
produce entirely different results.  I suggest at least 2 characters
for each value - more characters increases the chances of making your
version of these values more specific to you and your friends.
****************************************************************** */
var SX1 = "12";
var SX2 = "34";
var SGX = "56";
var SY1 = "ab";
var SY2 = "zz";
var SGY = "*&Lq";

/* ******************************************************************
In many parts of the code a starting point within an array are
calculated which is usually not the first location of the array, but is
based on some Pseudo Random value.  IN is an index that modifies this
value by adding to it.  Because of the keys given to an encryption, we
may calculate that we shall begin with the 10th element of an array. 
If IN is 2 this will be modified by starting with the 12th element of
that array instead.

The longer your message is, or your keys are, the more obfuscation
these values will perform.  These serve as a Salt.
****************************************************************** */
//Changed to INdex because linkedIN uses var IN
//var IN = 23;      // value used to modify index into an array.
var INdex = 23;      // value used to modify index into an array.
                  //  used in Hash2.  May be any + byte value.
var FR = 0.53791; // .25 < FR < .75, in rascal.js encryption rule.
var RC = 17;      // byte from 10 to 100 for recursive calls in Rand3

/* *****************************************************************
This value determines the seed values into Rand3 from a given
keyboard input string.  It should lie between 6.0 and 7.0.  It is
Floating Point, and the best value lies very near to 6.75.  It is
used in the Hash1 function.  Changing this value by a few hundredths
shall completely change the output of all encryptions.
***************************************************************** */
var IM = 6.5931; // increment multiplier


/* *****************************************************************
In JavaScript, all numeric values are 16 decimal-digit values.  To
help in the conversion to other languages I specify the range of
values that variables may take (as coded).
  (b) = byte. (8-bits).  Usually a numeric value.
  (c) = JavaScript character value (UTF may convert to u32).
  (i..) = signed integer that requires some number of places.
          (i16 means a 16-bit signed integer.)
  (u..) = unsigned integer requiring some number of bits.
  (fp) = floating point value.  8 byte IEEE standard.

In compiled languages it is more efficient to specify smaller values.
For example, with just minor changes all (fp) values can be changed
to u64 values, which would execute much faster, and require less
space for the object.
*************************************************************** */


                          /* THE CODE */
/* *****************************************************************
Within normal UTF-8 data there may appear special UTF codes with a
value beyond 8-bits.  Because my encryption code works only with 8-bit
values, we must convert these special UTF codes into a series of 8-bit
bytes, and then convert back to UTF after decryption.  We use special
marker-bytes to mark these converted strings of bytes.
This is probably unique to JavaScript which cannot address data content
as untyped bytes.
***************************************************************** */
function FixUTF (s) {  /* fix UTF data in s - string in, bytes out
  1 = 1 byte special marker storage
  2 = 2 bytes stored
  3 = 3 bytes
  4 = 4 bytes
*/
var i,j=0,t,la=s.length;         // (i32)
var a2 = new Array();            // (b) output array of bytes
  for (i=0; i<la; i++) {         // scan data for weird values
    t = s.charCodeAt(i);         // get an ordinal value (number)
    if (t == 13) continue;       // delete all <cr> values
    if (t == 10) {               // replace <lf> with <cr><lf>
      a2[j++]=13;
      a2[j++]=10;
      continue;
    }
    if (t < 5) {                 // special char to protect
      a2[j++]=1;  // special marker char to be protected follows
      a2[j++]=t;  // marker char
      continue;
    } 
    if (t < 0x100) {
      a2[j++] = t;               // normal text data, all done
      continue;
    }
    if (t < 0x10000) {           // small UTF stuff (most codes)
      a2[j++] = 2;               // marker
      a2[j++] = (t & 0xff00) >> 8;
      a2[j++] =  t & 0xff;
      continue;
    }
    if (t < 0x1000000) {         // this is for UTF-16 stuff...
      a2[j++] = 3;               // marker
      a2[j++] = (t & 0xff0000) >>16;
      a2[j++] = (t & 0xff00) >> 8;
      a2[j++] =  t & 0xff;
    }
    else {                       // big UTF-16 stuff
      a2[j++] = 4;               // marker
      a2[j++] = (t & 0xff000000) >>> 24;
      a2[j++] = (t & 0xff0000) >> 16;
      a2[j++] = (t & 0xff00) >> 8;
      a2[j++] =  t & 0xff;
    }
  }
  return a2;              // return an array of bytes
}

function RstUTF (a) {  // restore UTF codes - numbers in, chars out
var i=0,j=0,k,c,t,la=a.length;
var a1=new Array();    // output array
  do {                 // run the array
    t = a[i++];        // current value
    if (t < 5) {       // special marker present?
        c = t;         // bytes to follow
        t = a[i++];    // running total
        for (k=1; k<c; k++)
          t=(t << 8) | a[i++]; // rebuild unicode values
    }
    a1[j++] = String.fromCharCode(t); // put UTF back into data
  } while (i<la);
  return a1.join("");  // return string
}

/* ******************************************************************
THIS IS A BYTE SHUFFLE!
This will shuffle a byte array based on generated random numbers.
It is a complete shuffle.  This is the Knuth shuffle algorithm.
****************************************************************** */
function Shuffle (aray,seed,r) {  // shuffle an entire byte array
/* aray = the array of ordinal data to shuffle. (b)
   seed = some numeric array used to seed the shuffle keys (b)
   r    - if not zero, then init PRNG to new value. (b) */
var i,k,la=aray.length;           // (i32)
var t;                            // (b)
  if (r != 0) Rand1(seed);        // init PRNG?
  for (i=la-1; i>0; i--) {        // run backwards
    k=Math.floor(Rand1()*(i+1));  // randomly select a location
    t=aray[i]; aray[i]=aray[k]; aray[k]=t; // swap with end loc
  }
  return aray;                    // aray is now in random order
}

function UnShuffle (aray,seed,r) {// undo array shuffle
var ary1 = new Array ();          // output array (b)
var a = new Array ();             // (u32)
var i,k,la=aray.length;           // (i32)
var t;                            // (b)
  if (r != 0) Rand1(seed);        // init PRNG
  for (i=0; i<la; i++)            // create original key data
    a[i] = i;                     // location index
  for (i=la-1; i>0; i--) {        // run backwards
    k=Math.floor(Rand1()*(i+1));  // randomly select a location
    t=a[i]; a[i]=a[k]; a[k]=t;    // swap with end loc
  }
  for (i=0; i<la; i++)            // put bytes back where they were
    ary1[a[i]] = aray[i];
  return ary1;                    // return original order
}

/* ***************************************************************
This will randomly shuffle the bits within an array of bytes.
This can be very time-comsuming for large amounts of data -
In C this is more simple code than in JS.
*************************************************************** */
function BitShuffle (a,seed,r) {  // shuffle some bits in array
var i,j,l=0,la=a.length,m,n=0;    // (i32)
var b  = new Array ();            // bit array
  for (i=0; i<la; i++) {          // run the array for bits
    m = a[i];                     // an 8-bit byte
    for (j=7; j>=0; j--)          // process the byte
      b[l++] = (m >> j) & 1;      // change it into bits
  }
  b = Shuffle(b,seed,r);          // shuffle the bits
  for (i=0; i<la; i++) {          // reconstruct the array
    m = b[n++];                   // rebuild bytes
    for (j=1; j<8; j++)
      m = (m << 1) | b[n++];
    a[i] = m;
  }
  return a;
}

function UnBitShuffle (a,seed,r) {// Undo what BitShuffle did
var i,j,l=0,la=a.length,m,n=0;    // (i32)
var b  = new Array ();            // bit array
  for (i=0; i<la; i++) {          // run the array for bits
    m = a[i];                     // an 8-bit byte
    for (j=7; j>=0; j--)          // process the byte
      b[l++] = (m >> j) & 1;
  }
  b = UnShuffle(b,seed,r);        // unmix the bits
  for (i=0; i<la; i++) {          // reconstruct the array
    m = b[n++];
    for (j=1; j<8; j++)
      m = (m << 1) | b[n++];
    a[i] = m;
  }
 return a;
}

/* ****************************************************************
Normal text is only 7-bit data which leaves the high-order bit of
the key exposed.  This function works with a substitution array
to make the text full 8-bit data.
   aray = the array of ordinal data to have substitution applied
   seed = some numeric byte array used to build the substitution table
   r    = whether or not to init the RNG - if zero, then do not init.
 This function will build a substitution array to be used to force
 the data to be encrypted into a full 8-bit version, with an even
 distribution from 0-255.  It expands the dynamic range of the data.

 Best fed with a 256-byte hashed seed.
****************************************************************** */
function SubGen (aray,seed,r) {        // substitute char set gen
var ary1 = new Array (256);            // temp working array (b)
var i,k,la=aray.length;                // (i32)
  if (r != 0) Rand14(seed);            // prime the PRNG?
  for (i=0; i<256; i++)                // base index
    ary1[i]=i;
  for (i=0; i<la; i++) {               // replace characters
    k = Rand14();                      // random index into sub array
    aray[i] = ary1[(aray[i]+k)&255];   // sub value
  }
  return aray;
}

function UnSubGen (aray,seed,r) {      // undo substitute chars
var ary1 = new Array (256);            // temp working arrays (b)
var i,k,la=aray.length;                // (i32)
  if (r != 0) Rand14(seed);
  for (i=0; i<256; i++)
    ary1[i]=i;
  for (i=0; i<la; i++) {               // remove substitution
    k = Rand14();                      // random index into sub array
    aray[i] = (ary1[aray[i]]-k)&255;   // original value back
  }
  return aray;
}

/* ******************************************************************
There are 2 different things we can do with the data.
Data is terminated by a byte indicating what was done to it.
(That byte is thrown away on the decrypt end.)
  048 - (ASCII zero char) No compression done.
  128 - My special word-replacement compression was done.
The object is to hide the message length, but there are better
compression algorithms available in languages that can address the
true byte nature of data - JavaScript cannot do that easily because
UTF char-codes (used by most word processors) may be 4 bytes long.
In other words, 96-ASCII is in the trash bin of history.
****************************************************************** */
function Compress (strn) {
var i,la=strn.length,k,j=128;
var wk = new Array ();
var wd = new Array ();
var wk = new Array ();
var mk = String.fromCharCode(128);       // compression marker byte
  for (i=0; i<la; i++) {                 // check all characters
    k = strn.charCodeAt(i);              //  to test numeric values
    if (k > 127)                         // these are problems
      j = Math.min(j,k-129);             // don't use toxic markers
  }
  if (j > 0) {                           // things are OK, compress
    wd = Words(strn);                    // get words for compression
    j  = Math.min(j,wd.length);          // number of words to use
    for (i=0; i<j; i++) {                // replace wd's with markers
      wk = strn.split(wd[i]+" ");        // break text apart on wd
      strn=wk.join(String.fromCharCode(i+129)); // replace wd w/marker
    }
    wd.length = j;                       // dictionary length
    if (j == 0) strn += 0;               // oops, nothing here
    else strn += mk+mk+wd.join(mk)+mk;   // add dictionary to end
  }
  else strn += 0;                        // no comp - mark with zero
return strn;
}

/* undo compression, if any, at char, not number level (UTF) */
function DeCompress (strn,t) {           // see if we decompress
var i,j;
var wd = new Array ();
var wk = new Array ();
var mk = String.fromCharCode(128);       // compression marker byte
  if (t == 128) {                        // undo partial compress
    wk = strn.split(mk+mk);              // build working arrays
    strn = wk[0];                        // the data to expand
    wd = wk[1].split(mk);                // build the dictionary
    for (i=wd.length-1; i>=0; i--) {     // run the wd array
      j = String.fromCharCode(i+129);    // the compression code
      wk = strn.split(j);                // divide on the comp code
      strn = wk.join(wd[i]+" ");         // insert word back in
    }
  }
return strn;
}

/* **********************************************************
This routine sets diffusion in the text, such that any bit
change in the data produces an entirely new output.

It attaches the key values from Rand3 that produced the
diffusion to the end of the text - those values MUST be hidden
in later steps of the encryption.

The blocksize calculation leaves 16 places open for the keys
to Rand3 at the end of the data.  4 words (16 bytes).  We
diffuse the text, and then attach the keys for that process
to the end of the block.  THEN, later encryption steps mix it
all up and hide it.
********************************************************** */
function Diffuse (a) {  // diffuse a byte array
var i,j,la=a.length;
  Rand3(a);                      // prime the state array
var h = new Array(d3,d4,d5,d6);  // the original state array
  j = Math.floor(Rand3()*la);    // starting location in text
  for (i=0; i<la; i++)           // diffuse
    a[++j % la] ^= Math.floor(Rand3()*256);
  for (i=0; i<4; i++) {          // attach state data to array
    a[la++] = (h[i]&0xff000000)>>>24;
    a[la++] = (h[i]&0xff0000)>>16;
    a[la++] = (h[i]&0xff00)>>8;
    a[la++] = (h[i]&0xff);
  }
return a;
}

/* **********************************************************
This routine undoes the diffusion inserted by Diffuse().

We recover the keys to the diffusion process, and undo it.
********************************************************** */
function UnDiffuse (a) {
var i,j,la=a.length;
var h = new Array;
  if (la < 17) {                 // show error
    alert("This cannot be decrypted - too short!");
    return a;
  }
  for (i=3; i>=0; i--) {         // extract state data
    h[i]  = a[--la];
    h[i] += a[--la]<<8;
    h[i] += a[--la]<<16;
    h[i] += a[--la]<<24;
  }
  a.length = la;                 // delete end of array
  d3 = h[0];                     // reload diffusion state
  d4 = h[1];
  d5 = h[2];
  d6 = h[3];
  j = Math.floor(Rand3()*la);    // starting location in array
  for (i=0; i<la; i++)           // remove diffusion
    a[++j % la] ^= Math.floor(Rand3()*256);
return a;
}

/* ***************************************************************
This is unique to JavaScript.  It counts how often words occur in
a text so we can apply compression to the data.  Works for any UTF
data (even Arabic) - it replaces often-used words with markers,
and attaches a compression dictionary to the end of the data.
The Encrypt function uses the output of this function to produce a
compressed output file like this:

Uncompressed text  -      T the the the  and and and x.
Compressed text    -      T 111 000x.~~and~the~

Often-used words are replaced by a 1-byte marker, and the
dictionary is position-sensitive (note how the first word in the
dictionary is "and", and has the 0 marker - but values other than
these are really used.)  The dictionary may have 127 entries.

This function just produces an array of the top 127 words to be
used in compression.  The Encrypt and Decrypt functions work with
the results.  Average space compression is about 25% in English.

Compression would be a useful stragegy for any data because it
hides the true length of that data.  This simple example is
included just to show what compression does.
*************************************************************** */
function Words (strn) {  // most used words
var i,j,k=0,c,t,la=0;
var wk = new Array ();          // working array
var wd = new Array ();          // isolated words
var ct = new Array ();          // count & value for a word
                     /* get word list */
  wk = strn.split(" ");         // break out the words
  if (wk.length < 2) return wd; // nothing here.
  for (i=0; i<wk.length; i++)   // find words long enough
    if ((wk[i].length > 0) &&
        (wk[i].length < 100)) { // good word?
      wd[la] = wk[i];           // record it
      ct[la++] = 1;             // count one instance
    }
  wk = strn.split("    ");      // don't forget spaces
  wd[la] = "   ";               // (trick - the "word" is 3-sp)
  ct[la++] = wk.length - 1;     // count of 4-space groups
              /* count instances of the words */
  for (i=la-2; i>0; i--) {      // run backwards for totals
    c = wd[i];                  // remember the word
    for (j=0; j<i; j++)         // look for dup word
      if (c == wd[j]) {         // same word - total 'em
        ct[j]++;                //  (another instance)
        break;                  // move on to next word
      }
  }
                      /* get rid of junk */
  for (i=0; i<la; i++)          // run the array
    if (ct[i] > 1) {            // 2 wds before we can save
      wd[k] = wd[i];
      t=FixUTF(wd[i]).length;   // get 8-bit bytes for wd
      ct[k++]=t*ct[i]-(t+1);    // how much it really saves   
    }
  la = k;                       // correct the length
   /* final key-sort of words according to their savings */
var inc = la >> 1;              // initial increment
  while (inc > 0) {             // decreasing inc loop
    for (i=inc; i<la; i++) {    // one pass thru the data
      j=i; k=i-inc;
      while ((j>=inc) && (ct[k]<ct[j])) { // order pairs
        t=ct[j]; ct[j]=ct[k]; ct[k]=t;    // propagate back
        c=wd[j]; wd[j]=wd[k]; wd[k]=c;
        j-=inc; k-=inc;         // do we go back more?
      }
    }
    inc = Prime(inc >> 1);      // decrease the increment
  }
                 /* get ready for output */
  while ((la>0)&&(ct[la-1]<2)) la--; // just a catch-all
  wd.length=Math.min(127,la);   // words that save space
  return wd;
}

/* ******************************************************************
This is a special sort that just puts data into buckets no larger
than x. The buckets are ordered (every element within bucket 1 is
equal to or less than every element within bucket 2), but the data
within the buckets may not be ordered (unless x=0).

Used as irreversible mixer of data in Hash2, but also a pretty
good stand-alone sort (setting x to zero).
Watch out for the mixed mode arithmetic involving the c value...
You can do that in JavaScript but not C++, for example.
PS - ALL numbers are FP in JS...   There are no integers in JS
 (although certain logicals truncate to 32-bit integer-like values
   - but they are really still FP values - watch out!)
NOTE - JavaScript is not subject to array subscript range-errors
       like C is. (Subscripts outside defined range - In JS, arrays
       have no defined range [no dimension statement], and array
       elements that have not been filled are undefined so
       comparisons turn out false which stops the while's.)
       In C, for example, you will need to test l and r in the
       center-testing whiles to ensure they are still in range.
****************************************************************** */
function QuickSort (a,left,right,x) { // recursive quicksort
var t;                                       // (b, fp - ALL THE SAME!)
var l=left,r=right;                          // local values (i32)
var c=(a[l]+a[l+1]+a[(l+r)>>1]+a[r-1]+a[r])/5; // central value (fp)
  do {
    while (a[l] < c) l++;                    // find val above center
    while (c < a[r]) r--;                    // find val below center
    if (l <= r) {                            // still in current box?
      t=a[l]; a[l++]=a[r]; a[r--]=t;         // swap, adjust indexes
    }
  } while (l <= r);                          // until we're thru
  if (left < (r-x)) {                        // only go to bucket size
    if ((r-left)>21) QuickSort(a,left,r,x);  // recursive call
    else ShellSort(a,left,r,x);              // save stack overhead
  }
  if (l < (right-x)) {
    if ((right-l)>21) QuickSort(a,l,right,x);// recursive call
    else ShellSort(a,l,right,x);
  }
  return a;
}

/* *************************************************************** 
  a is the key, b is the array to sort on that key, and x is how
  far to go into the sort.  See the sort, above.
****************************************************************** */
function KeySort (a,b,left,right,x) { // recursive quicksort
var t;                                       // (b, fp - ALL THE SAME!)
var l=left,r=right;                          // local values (i32)
var c=(a[l]+a[l+1]+a[(l+r)>>1]+a[r-1]+a[r])/5; // central value (fp)
  do {
    while (a[l] < c) l++;                    // find val above center
    while (c < a[r]) r--;                    // find val below center
    if (l <= r) {                            // still in current box?
      t=a[l]; a[l]=a[r]; a[r]=t;             // swap
      t=b[l]; b[l++]=b[r]; b[r--]=t;         // swap, adjust indexes
    }
  } while (l <= r);                          // until we're thru
  if (left < (r-x))  KeySort(a,b,left,r,x);  // recursive call
  if (l < (right-x)) KeySort(a,b,l,right,x); // recursive call
//alert(a);
//alert(b);
  return b;
}

/* ******************************************************************
This is a Shell sort that is not recursive, but works on just one
portion of an array delimited by l and r.  Not as fast as Qsort,
but available to those languages that do not support recursion.
****************************************************************** */
function ShellSort (a, l, r, x) { // sort until inc smaller than x
var i,j,t,ipl,jmi;
var inc = (r-l+1) >> 1;           // initial increment
  while (inc > 0) {               // decreasing inc loop
    ipl = inc + l;                // inc plus left
    for (i=ipl; i<=r; i++) {
      j = i;
      while ((j>=ipl) && (a[j-inc]>a[j])) {  // move low value back
        t=a[j]; a[j]=a[j-inc]; a[j-inc]=t;
        j -= inc;
      }
    }
    if (inc <= x) return a;       // no need to go on
    inc = Prime(inc >> 1);        // new increment
  }
  return a;
}

/* ******************************************************************
This will echo a prime, or return the next LOWER value that is prime.
****************************************************************** */
function Prime (tst) {
var i=3,tp;
  tst = Math.floor (tst);    // must be integer...
  if (tst < 4) return tst;   // 0,1,2,3 are just returned...
  if ((tst & 1) == 0) tst--; // force the rest to lower-odd
  if (tst < 8) return tst;   // already prime (3,5,7)
  tp = Math.sqrt(tst+1);     // no need to go beyond this value
  while (i < tp) {
    if ((tst % i) == 0) {    // oops, divisible
      tst -= 2;
      i = 3;
      continue;              // start loop over
    }
    i += 2;                  // test next value
  }
  return tst;                // this is a prime
}

/* *****************************************************************
This hash routine gives Rand3 a 4-word seed value from an array of
bytes.  The order of the array values is very important to the
values of those seeds.

If we want "abcde" to give a different result from "abdce", we must
figure out how to give weight to the position of a value within an
array of values.  Just straight addition, for example, does not
give any weight to the order of values, and gives the same results
for both of those strings.  A 128-bit checksum (CRC) might work, but
the overhead would be too expensive - I need 128-bit compledxity.

If we accumulate a sum by multiplying the values in an array by an
ever-increasing multiplier, then we have positional weight.  So the
problem is to derive a formula to produce an increment given the
nature of the values (mean and range), and the number (count) of the
values.  Such a formula is  ->  inc = n*tot/(cnt*sum)
where n is a selected value to give proper output (relative to tot.)

Note that this is a floating-point value!
***************************************************************** */
function Hash1 (aray) {  // get a seed value from an array
var s = new Array(RC*FR,INdex*IM,IM*1000,FR*1000); // Rand3 seeds
var i,sum=0;
var cnt = aray.length;            // the number of items in aray
  for (i=0; i<cnt; i++)           // run the array
    sum += aray[i];               //  to get sum of items
var mul = 1;                      // the first multiplier
var inc=IM*dmod3/(cnt*sum);       // increment to the multiplier
  for (i=0; i<cnt; i++) {         // run the array
    s[i&3] += aray[i] * mul;      //  accumulate the weighted sum
    mul += inc;                   //  bump multiplier by inc
  }
  d3 = Math.floor(s[0]);          // load the Rand3 seeds
  d4 = Math.floor(s[1]);
  d5 = Math.floor(s[2]);
  d6 = Math.floor(s[3]);
  return;                         // seed is loaded...
}

/* *******************************************************************
This hash function is quite a bit more sophisticated than it may
appear.  The initial encryption value contains the length of the input
array, bits are shifted around within and among bytes, a partial sort
is used as an irreversible component, and the hashed value is
thoroughly shuffled at the bit level.

Of particular interest is that the shifting and shuffling are not the
same for any two values to be hashed - it is based on a stream of
random numbers generated from the array being hashed (see Rand3, which
builds Rand7, which selects Rand1 values).  This ain't a toy!
******************************************************************* */
function Hash2 (aray,len) {      // secure hash function
/* len is length of output, and NOT the length of the input array */
var ary1 = new Array ();         // internal place for data hash (b)
var i,j,k,m,la=aray.length;      // (i32)
                          /* initialization */
  if (len == 0) len = la;             // for unknown lengths
  if (len > 1279) len = 1279;         // for internal protection
  if (len < 12) len = 12;             // at least 12 long (96 bits)
  k = Math.floor(Rand1(aray)*la)+INdex;  // 1st data loc from aray
  for (i=0; i<len; i++)               // set base encryption bytes
    ary1[i]=Rand1()*256;
  ary1[len>>1]^=((la>>8)&255);        // insert input data length
  ary1[len>>2]^=(la&255);
  QuickSort(ary1,0,len-1,len>>1);     // irreversible byte mixer
  BitShuffle(ary1,0,0);               // mix up encryption bits
                       /* actual hash function */
// do it len values at a time, and force to multiple of len
  m = Math.floor((la+len-1)/len);     // groups of len chars
  for (i=0; i<m; i++) {               // run input array
// now operate on a group of len characters (a block, if you like)
    for (j=0; j<len; j++) {
      ary1[j]^=aray[++k % la];        // xor-in next value
      if (Rand7()<FR)                 // Rand1 output confusion
        ary1[Math.floor(Rand1()*len)]^=Math.floor(Rand7()*256);
    }
    QuickSort(ary1,0,len-1,len>>1);   // irreversible byte mixer
    BitShuffle(ary1,0,0);             // mix up the bits
  }
  QuickSort(ary1,0,len-1,len>>1);     // irreversible byte mixer
  return BitShuffle(ary1,0,0);        // final mix of the bits
}


/* **************************************************************** 
An assortment of pseudo-random number generators.

I use different generators that are not mathematically related, as
much as possible, to be certain of generating non-related sequences.

LCGs produce a base run for the LFGs upon which the actual seed is
impressed.  Rand3 is the LCG.  Rand1 is a special cascade LCG of my
design that gives more deference to the seed.  14 and 15 are
versions of the old RC4 system tightened up just a bit, and Rand7
is the LFG.
***************************************************************** */

/* ****************************************************************
This gets close to a Cryptographically Secure (CS) generator.
This is a work in progress.  I think it is "secure" because there
is no way to tell which of the 1279+ generators produce output.

There are at least 1279 LCGs here, and the one selected is determined
by Rand7.  Also, there is a "carry" from one LCG to the next one.

Note that "clocking" Rand7 separately will alter the output of this
generator in both the LCG selected, and the impact of the carry from
the previous LCG.  In the Encrypt function notice how Rand7 is
clocked in an independent and random manner, which really alters the
output of Rand1.  If I'm right, you cannot touch the output of this
(the way I use it.)
**************************************************************** */
var d1    = new Array (); // place for state digits
var r1    = 0;            // place for remaindering
var dcnt1 = 1279;         // number of generators
var dmod1 = 2147483647;   // max value (prime)
var dmul1 = new Array (); // multipliers

dmul1[0] = 412457;        // prime
for (var i=1; i<dcnt1; i++)          // init the cycle values
  dmul1[i] = Prime(dmul1[i-1]-2);

function Rand1 (seed) {
var i,j,t,m;
  if (arguments.length > 0) {        // seed present?
var ls = seed.length;
    j = Math.floor(Rand7(seed) * dcnt1); // mess up index into seed
    r1 = j;
    for (i=dcnt1-1; i>=0; i--)       // base key
      d1[i] = Rand7() * dmod1 +
        seed[j++ % ls] * (1048576 + 16384 + 1 + 1/4096);
    for (i=0; i<dcnt1+j; i++) Rand1(); // recursive init
  }
  j =  Math.floor(Rand7()*dcnt1);    // which generator to use
  t =  d1[j] * dmul1[j] + r1;        // do LCG math (w/remaindering)
  r1 = ((t/dmod1)&15)|1;             // get new remainder value
  m =  t % dmod1;                    // new digit in state array
  d1[j] = m;                         // store value off
  return m / dmod1;                  // the return fp number...
}

/* ******************************************************************
The idea for this comes from an Alternating Step Generator, and it
is quite a bit more robust than a simple Linear Congruential Gen.
(It is 4 LCGs in one!)  It is used to produce a random base, related
to the keyboard input, upon which the keyboard key is impressed.

There are four different seeds calculated in Hash1 each with
about 2^30 different independent possible values based on what the
user entered from the keyboard (if he enters at least 25 values).
That gives a complexity of nearly 2^120.
    
But Rand3 only primes the base of Rand7, and that base is overlayed
with up to 8,000 keyboard characters - that's where we get the 55,000
bit encryption depth.  The period of all other PRNGs is over 2^500,
with key depth of over 2^8,000 (except Rand14 with a key depth of
2^1,600 bits.)
******************************************************************* */
var d3,d4,d5,d6;              // internal seed values < dmod3
var d3p   = 2147483648;       // power of 2 (just for return)
// dmod3 is very special! - it is one less than a power of 2
var dmod3 = Prime(d3p-1);     // prime (4 different periods)
var dmod4 = Prime(dmod3-2);
var dmod5 = Prime(dmod4-2);
var dmod6 = Prime(dmod5-2);
var dmul3 = 412457;           // prime (4 different sequences)
var dmul4 = 403681;           //  (val-1 is divisible by 4)
var dmul5 = 393257;           //   (see LCG ref in links)
var dmul6 = 389733;
var d3l   = dmod3/3;
var d3h   = d3l+d3l;

function Rand3 (seed) {       // simple PRNG
var i;
  if (arguments.length > 0) { // seed present?
    Hash1(seed);              // get 4 words of internal seed
    for (i=0; i<RC+7; i++)    // let 'em settle down
      Rand3();                //  recursive discard of 1st values
  }
  d3=(d3*dmul3+1)%dmod3;      // clock d3
  if (d3 < d3l)               // clock d4 about 1/3rd of the time
    d4=(d4*dmul4+1)%dmod4;
  else if (d3 > d3h)
    d5=(d5*dmul5+3)%dmod5;    //  d5 about 1/3rd
  else
    d6=(d6*dmul6+5)%dmod6;    //   or d6
  return (d3^d4^d5^d6)/d3p;   // positive, less than 1
}

/* ****************************************************************
The purpose of this is to have a really long-running PRNG.  Mainly
used to drive Rand1.  This is a Lagged Fibonacci Generator...
**************************************************************** */
var d7    = new Array ();    // place for digits (state array)
var cnt7;                    // index into state array
var dcnt7 = 1279;            // minimum number of digits
var dmod7 = 2251799813685248;// max size (power of 2)

function Rand7 (seed) {      // Additive Lagged Fibonacci Generator
var j,m,n;
  if (arguments.length > 0) {   // seed present?
var i,ls=seed.length;           // here is the length of the seed
var sq=Math.sqrt(dmod7);        // to fill the lower digits
    dcnt7 = Math.max(1279,ls);  // set the data size
    j = Math.floor(Rand3(seed)*dcnt7); // random value
    cnt7 = dcnt7+Math.floor(Rand3()*dcnt7); // where to start
    for (i=0; i<dcnt7; i++) d7[j++ % dcnt7]=Rand3()*sq;
    j = Math.floor(Rand3()*ls); // random value
    for (i=dcnt7-1; i>=0; i--)  // stuff seed on random digits
      d7[i]+=(Rand3()*dmod7)+(seed[j++ % ls]*
        (549755813888 + 268435456 + 131072 + 4 + 1/256));
    for (i=0; i<dcnt7>>1; i++) Rand7(); // recursive init
  }
  n=++cnt7;                     // rotate, then set index
  j=(n-1279)%dcnt7;             // for efficiency
  m = (d7[(n-418)%dcnt7]+d7[j])%dmod7; // new calculation
  d7[j] = m;                    // feedback
  return m / dmod7;
}

/* ************************************************************
This is a base version of RC4 (almost).  It is as described,
but with a few exceptions.  Once you understand this
simple algorithm, it is very easy to modify.

For maximum effectiveness you should hash keys to a length of
256 characters.  That makes it very effective for keys smaller
than about 500 keyboard characters.  The hash ensures a max key.

The output of RC4-type generators can be cryptographically
secure for short runs, like I use them.
************************************************************* */
var d14 = new Array ();        // main key array
var i14,j14;                   // indexes into d14 array

function Rand14 (seed) {       // RC4 stream cypher
var t;
  if (arguments.length > 0) {  // args present?
var i,j,k,ls=seed.length;
    for (i=0; i<256; i++)      // init the key schedule
      d14[i] = i;
    j=seed[0];
    for (i=0; i<256; i++) {
      j=(j+d14[i]+seed[i%ls])&255;
      t=d14[i]; d14[i]=d14[j]; d14[j]=t;
    }
    i14 = d14[1];              // indexes into array
    j14 = d14[0];
    j   = i14;                 // prevent problem with globals
    k   = 512+j;
    for (i=0; i<k; i++) Rand14();  // initialize
  }

  i14 = (i14 + 1) & 255;       // generate indexes
  t = d14[i14];                // remember for swap, coming up
  j14 = (j14 + t) & 255;
  d14[i14] = d14[j14];         // swap
  d14[j14] = t;
  return d14[(d14[i14] + t) & 255];  // value from 0 to 255
}

/* ***********************************************************
  This is a stronger version of RC4. Mod 512 vs fixed 256.

  With this you can have a key size equal to plaintext size.
*********************************************************** */
var d15 = new Array ();        // main key array
var dcnt15 = 512;              // min length of d15 array
var i15,j15;                   // indexes into d15 array

function Rand15 (seed) {       // Super RC4-like cipher
var t;
  if (arguments.length > 0) {  // args present?
var i,j,k,ls=seed.length;
    dcnt15 = Math.floor((ls+511)/512)*512; // mod 512
    for (i=0; i<dcnt15; i++)   // init key schedule
      d15[i] = i;
    j=seed[0];
    for (i=0; i<dcnt15; i++) {
      j=(j+d15[i]+seed[i%ls])%dcnt15;
      t=d15[i]; d15[i]=d15[j]; d15[j]=t;
    }
    i15 = d15[0];              // indexes into array
    j15 = d15[1];
    j   = i15;                 // prevent problem with globals
    k   = (dcnt15>>1)+j;
    for (i=0; i<k; i++) Rand15(); // initialize
  }

  i15 = (i15 + 1) % dcnt15;    // generate first index
  t = d15[i15];                // set for swap
  j15 = (j15 + t) % dcnt15;    //  second index
  d15[i15] = d15[j15];         // swap them suckers
  d15[j15] = t;
  return d15[(d15[i15] + t) % dcnt15] & 255;  // value from 0 to 255
}
