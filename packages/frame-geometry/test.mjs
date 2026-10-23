import test from 'node:test';
import assert from 'node:assert/strict';
import { frames, fitRect, placement } from './geometry.mjs';
const base = { imageWidth: 200, imageHeight: 100, frameWidth: 100, frameHeight: 100 };
test('contain centers and preserves aspect', () => assert.deepEqual(fitRect(base), {width:100,height:50,left:0,top:25}));
test('cover centers a crop', () => assert.deepEqual(fitRect({...base,fit:'cover'}), {width:200,height:100,left:-50,top:0}));
test('zoom and frame-relative offsets', () => assert.deepEqual(fitRect({...base,zoom:2,x:10,y:-10}), {width:200,height:100,left:-40,top:-10}));
test('subpixel results remain unrounded', () => assert.equal(placement(3,2,100,100).height, 200/3));
test('presets are deeply immutable', () => { assert.throws(() => {frames.square[0]=1;},TypeError); assert.throws(()=>{frames.square=[1,1];},TypeError); });
for (const field of ['imageWidth','imageHeight','frameWidth','frameHeight','zoom']) {
  test(`${field} rejects invalid numbers and coercion`, () => {
    for (const value of [0,-1,NaN,Infinity,-Infinity,'100',null]) assert.throws(()=>fitRect({...base,[field]:value}),RangeError);
  });
}
test('offset validation', () => { for (const field of ['x','y']) for (const value of [NaN,Infinity,'1',null]) assert.throws(()=>fitRect({...base,[field]:value}),RangeError); });
test('invalid fit rejected', () => assert.throws(()=>fitRect({...base,fit:'stretch'}),RangeError));
test('numeric overflow rejected', () => assert.throws(()=>fitRect({...base,zoom:Number.MAX_VALUE}),RangeError));
test('underflow rejected', () => assert.throws(()=>fitRect({...base,frameWidth:Number.MIN_VALUE,frameHeight:Number.MIN_VALUE,zoom:Number.MIN_VALUE}),RangeError));
test('contain and cover invariants across dimensions', () => {
  for (const iw of [1,17,1920]) for (const ih of [1,33,1080]) for (const [fw,fh] of Object.values(frames)) {
    for (const fit of ['contain','cover']) {
      const r=fitRect({imageWidth:iw,imageHeight:ih,frameWidth:fw,frameHeight:fh,fit});
      assert.ok(Math.abs(r.width/r.height-iw/ih)<1e-9);
      assert.ok(Math.abs(r.left*2+r.width-fw)<1e-8);
      assert.ok(Math.abs(r.top*2+r.height-fh)<1e-8);
      assert.ok(fit==='contain' ? r.width<=fw+1e-8&&r.height<=fh+1e-8 : r.width>=fw-1e-8&&r.height>=fh-1e-8);
    }
  }
});
