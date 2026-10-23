import test from 'node:test';
import assert from 'node:assert/strict';
import { frames, placement } from './geometry.mjs';
test('portrait contains landscape without distortion', () => assert.deepEqual(placement(1920,1080,1080,1920), {width:1080,height:607.5,left:0,top:656.25}));
test('square frame centers portrait', () => assert.deepEqual(placement(100,200,1080,1080), {width:540,height:1080,left:270,top:0}));
test('zoom preserves aspect ratio and centers crop', () => assert.deepEqual(placement(100,100,100,100,2), {width:200,height:200,left:-50,top:-50}));
test('offsets are percentages of output dimensions', () => assert.deepEqual(placement(100,100,100,200,1,10,-10), {width:100,height:100,left:10,top:30}));
test('invalid inputs fail explicitly', () => { for (const n of [0,-1,NaN,Infinity]) assert.throws(() => placement(n,10,10,10),RangeError); assert.throws(() => placement(1,1,1,1,1,NaN),RangeError); });
test('all presets fit inside a 1920 output axis', () => { for (const [w,h] of Object.values(frames)) assert.ok(Math.max(w,h)<=1920); });
