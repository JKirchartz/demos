/*------------------------------------------------------------------------------
!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

This File is NOT part of CODEF
 This File is NOT part of CODEF
  This File is NOT part of CODEF
   This File is NOT part of CODEF
    This File is NOT part of CODEF
     This File is NOT part of CODEF

!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
<!--
  JavaScript Flod 1.0
  2011/11/30
  Christian Corti
  Neoart Costa Rica

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 	OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 	LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR
  IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

  This work is licensed under the Creative Commons Attribution-Noncommercial-Share Alike 3.0 Unported License.
  To view a copy of this license, visit http://creativecommons.org/licenses/by-nc-sa/3.0/ or send a letter to
  Creative Commons, 171 Second Street, Suite 300, San Francisco, California, 94105, USA.
-->
------------------------------------------------------------------------------*/

var CODEF_MUSICPLAYER=null;
var CODEF_AUDIO_CONTEXT=null;
var CODEF_AUDIO_NODE=null;
function music(type){
if(typeof(webkitAudioContext) != 'undefined'){
	switch(type){
		case "MK":	CODEF_MUSICPLAYER = window.neoart.createMKPlayer(); // (Soundtracker 2.3, Soundtracker 2.5, NoiseTracker 1.0, NoiseTracker 1.1, NoiseTracker 2.0)
				break;
		case "FC":	CODEF_MUSICPLAYER = window.neoart.createFCPlayer(); // (FutureComposer 1.0, FutureComposer 1.2, FutureComposer 1.3, FutureComposer 1.4)
				break;
		case "YM":	CODEF_AUDIO_CONTEXT = new webkitAudioContext(); // Atari YM Format !!! ;)
				CODEF_AUDIO_NODE = CODEF_AUDIO_CONTEXT.createJavaScriptNode(8192);
				CODEF_MUSICPLAYER = new YmProcessor();
				break

	}
	CODEF_MUSICPLAYER.stereo=false;
}	
	if(type=="YM"){
		
		this.LoadAndRun=function(zic){
if(typeof(webkitAudioContext) != 'undefined'){
			var fetch = new XMLHttpRequest();
			fetch.open('GET', zic);
			fetch.overrideMimeType("text/plain; charset=x-user-defined");
			fetch.onreadystatechange = function() {
				if(this.readyState == 4 && this.status == 200) {
					var t = this.responseText || "" ;
					var ff = [];
					var mx = t.length;
					var scc= String.fromCharCode;
					for (var z = 0; z < mx; z++) {
						ff[z] = scc(t.charCodeAt(z) & 255);
					}
					var binString = new dataType();
					binString.data = ff.join("");
					YmConst_PLAYER_FREQ = CODEF_AUDIO_CONTEXT.sampleRate;

					CODEF_MUSICPLAYER.load(binString);
				}
			}
			fetch.send();
}
		}
	}
	else{
		this.LoadAndRun=function(zic){
if(typeof(webkitAudioContext) != 'undefined'){
			var fetch = new XMLHttpRequest();
			fetch.open('GET', zic);
			fetch.overrideMimeType("text/plain; charset=x-user-defined");
			fetch.responseType = "arraybuffer";
			fetch.onreadystatechange = function() {
				if(this.readyState == 4 && this.status == 200) {
					CODEF_MUSICPLAYER.load(this.response);
					CODEF_MUSICPLAYER.play();
				}
			}
			fetch.send();
}
		}
	}
	
	this.stereo=function(stat){
if(typeof(webkitAudioContext) != 'undefined'){
		CODEF_MUSICPLAYER.stereo=stat;
}
	}
	
	
	this.player=CODEF_MUSICPLAYER;
	return this;
	
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//
// YM replay routine
//
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////
//
// YmConst.js
//
////////////////////////////////////////////////////////////////////
	var YmConst_BUFFER_SIZE = 8192;
 	var YmConst_PLAYER_FREQ = 48000;
	var YmConst_DRUM_PREC = 15;

	var YmConst_AMSTRAD_FREQ = 1000000;
	var YmConst_ATARI_FREQ = 2000000;
	var YmConst_SPECTRUM_FREQ = 1773400;

	var YmConst_INTERLEAVED = 1;
	var YmConst_DRUM_SIGNED = 2;
	var YmConst_DRUM_4BITS = 4;
	var YmConst_TIME_CONTROL = 8;
	var YmConst_LOOP_MODE  = 16;

	var YmConst_MFP_PREDIV = [0, 4, 10, 16, 50, 64, 100, 200];

	var YmConst_MONO = [
      0.00063071586250394, 0.00163782667521185, 0.00269580167037975, 0.00383515935748365,
      0.00590024516535946, 0.00787377544480728, 0.01174962614825892, 0.01602221747489853,
      0.02299061047191789, 0.03141371908729311, 0.04648986276843572, 0.06340728985463016,
      0.09491256447035126, 0.13414919481999166, 0.21586759036022013, 0.33333333333333333
     ];

	var YmConst_STEREO = [
      0.00094607379375591, 0.00245674001281777, 0.00404370250556963, 0.00575273903622547,
      0.00885036774803918, 0.01181066316721091, 0.01762443922238838, 0.02403332621234779,
      0.03448591570787683, 0.04712057863093966, 0.06973479415265358, 0.09511093478194525,
      0.14236884670552690, 0.20122379222998749, 0.32380138554033021, 0.50000000000000000
    ];

	var YmConst_ENVELOPES = [
      15,14,13,12,11,10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
       0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      15,14,13,12,11,10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
       0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      15,14,13,12,11,10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
       0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      15,14,13,12,11,10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
       0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
       0, 1, 2, 3, 4, 5, 6, 7, 8, 9,10,11,12,13,14,15, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
       0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
       0, 1, 2, 3, 4, 5, 6, 7, 8, 9,10,11,12,13,14,15, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
       0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
       0, 1, 2, 3, 4, 5, 6, 7, 8, 9,10,11,12,13,14,15, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
       0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
       0, 1, 2, 3, 4, 5, 6, 7, 8, 9,10,11,12,13,14,15, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
       0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      15,14,13,12,11,10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0,15,14,13,12,11,10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0,
      15,14,13,12,11,10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0,15,14,13,12,11,10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0,
      15,14,13,12,11,10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
       0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      15,14,13,12,11,10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9,10,11,12,13,14,15,
       0, 1, 2, 3, 4, 5, 6, 7, 8, 9,10,11,12,13,14,15,15,14,13,12,11,10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0,
      15,14,13,12,11,10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,
      15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,
       0, 1, 2, 3, 4, 5, 6, 7, 8, 9,10,11,12,13,14,15, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9,10,11,12,13,14,15,
       0, 1, 2, 3, 4, 5, 6, 7, 8, 9,10,11,12,13,14,15, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9,10,11,12,13,14,15,
       0, 1, 2, 3, 4, 5, 6, 7, 8, 9,10,11,12,13,14,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,
      15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,
       0, 1, 2, 3, 4, 5, 6, 7, 8, 9,10,11,12,13,14,15,15,14,13,12,11,10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0,
      15,14,13,12,11,10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9,10,11,12,13,14,15,
       0, 1, 2, 3, 4, 5, 6, 7, 8, 9,10,11,12,13,14,15, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
       0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
    ];
    
////////////////////////////////////////////////////////////////////
//
// YmSong.js
//
////////////////////////////////////////////////////////////////////
function YmSong(stream){
	this.title;
	this.author;
	this.comment;

	this.attribs;
	this.clock;
	this.digidrums;
	this.drums;
	this.frames=new Array();
	this.frameSize;
	this.length;
	this.rate;
	this.restart;
	this.supported = true;

	this.data = new dataType();
	this.data.data=stream;
	
	
	this.init=function(){
		this.decode();
		if (this.attribs & YmConst_INTERLEAVED) this.deinterleave();

		for (i = 0; i < this.length; ++i) {
			this.frames[i]=this.data.readBytes(0, this.frameSize);
		}

	}
	
	this.decode=function(){
		var digidrum;
		var i;
		var id= this.data.readMultiByte(4,"txt");
		
		switch (id) {
			case "YM2!":
			case "YM3!":
			case "YM3b":
				this.frameSize = 14;
				this.length = (this.data.data.length - 4) / this.frameSize;
				this.clock = YmConst_ATARI_FREQ;
				this.rate = 50;
				this.restart = (id != "YM3b") ? 0 : this.data.readByte();
				this.attribs = YmConst_INTERLEAVED | YmConst_TIME_CONTROL;
				break;

			case "YM4!":
				this.supported = false;
				break;
				
			case "YM5!":
			case "YM6!":
				id = this.data.readMultiByte(8, "txt");
				if (id != "LeOnArD!") {
					this.supported = false;
					return;
				}

				this.length  = this.data.readInt();
				this.attribs = this.data.readInt();
				this.drums   = this.data.readShort();
				this.clock   = this.data.readInt();
				this.rate    = this.data.readShort();
				this.restart = this.data.readInt();
				this.data.readShort();

				if (this.drums) {
					this.digidrums = new Array();

					for (i = 0; i < this.drums; ++i) {
						this.digidrum = new Digidrum(this.data.readInt());

						if (this.digidrum.size != 0) {
							this.digidrum.wave.data = this.data.readBytes(0, this.digidrum.size);
							this.digidrum.convert(this.attribs);
							this.digidrums[i] = this.digidrum;
						}
					}
					this.attribs &= (~YmConst_DRUM_4BITS);
				}

				this.title = this.data.readString();
				this.author = this.data.readString();
				this.comment = this.data.readString();

				this.frameSize = 16;
				this.attribs = YmConst_INTERLEAVED | YmConst_TIME_CONTROL;
				break;

			case "MIX1":
				supported = false;
				break;

			case "YMT1":
			case "YMT2":
				supported = false;
				break;

			default:
				supported = false;
				break;
		}

	}
	
	this.deinterleave=function(){
		var i;
		var j;
		var s=0;
		
		var p=new Array();
		var r=new Array();

		for (i = 0; i < this.frameSize; ++i) p[i] = this.data.pos + (this.length * i);

		for (i = 0; i < this.length; ++i) {
			for (j = 0; j < this.frameSize; ++j) r[j + s] = this.data.data[i + p[j]];
			s += this.frameSize;
		}

		this.data.data="";
		this.data.data = r;
		this.data.pos=0;
		this.attribs &= (~YmConst_INTERLEAVED);
	}
	
	this.init();
	
}

////////////////////////////////////////////////////////////////////
//
// YmProcessor.js
//
////////////////////////////////////////////////////////////////////
function YmProcessor(){
	this.counter;

	this.sound;
	this.soundChannel;
	this.soundChannelPos;
	this.song;
	this.loop=1;
	this.stereo=0;

	this.audioFreq;
	this.clock;
	this.registers=new Array();
	this.volumeEnv;

	this.buffer;
	this.bufferSize;
	this.voiceA=new YmChannel(this);;
	this.voiceB=new YmChannel(this);;
	this.voiceC=new YmChannel(this);;

	this.samplesTick;
	this.samplesLeft;
	this.frame;

	this.envData;
	this.envPhase;
	this.envPos;
	this.envShape;
	this.envStep;

	this.noiseOutput;
	this.noisePos;
	this.noiseStep;
	this.rng;

	this.syncBuzzer;
	this.syncBuzzerPhase;
	this.syncBuzzerStep;
	


	this.init=function(){
		var i;

		this.bufferSize = YmConst_BUFFER_SIZE;
		this.buffer = new Array();

		for (i = 0; i < this.bufferSize; ++i) this.buffer[i] = new Sample();

		this.envData = YmConst_ENVELOPES;
	}
	
	this.load=function(stream){
		var monLHa = new LHa();
		this.song = new YmSong(monLHa.unpack(stream));

		this.audioFreq = YmConst_PLAYER_FREQ;
		this.clock = this.song.clock;
		this.samplesTick = this.audioFreq / this.song.rate;

		CODEF_AUDIO_NODE.onaudioprocess = function (event) {
			CODEF_MUSICPLAYER.mixer(event);
		}

		
		return this.song.supported;
	}
	
	this.mixer=function(e){
		var b=0;
		var i=0;
		var mixed=0;
		var mixPos=0;
		var sample;
		var size=0;
		var toMix=0;
		var value=0;

		while (mixed < this.bufferSize) {
			if (this.samplesLeft == 0) {
				if (this.frame >= this.song.length) {
					if (this.loop) {
						this.frame = this.song.restart;
					} else {
						this.stop();
						return;
					}
				}

				this.syncBuzzerStop();
				
				for(i=0;i<this.song.frameSize;i++){
					this.registers[i]=this.song.frames[this.frame][i].charCodeAt(0);
				}
				this.frame++;
				//this.registers = this.song.frames[this.frame++];
				this.updateEffects(1, 6, 14);
				this.updateEffects(3, 8, 15);

				this.writeRegisters();
				this.samplesLeft = this.samplesTick;
			}

			toMix = this.samplesLeft;
			if ((mixed + toMix) > this.bufferSize)
				toMix = this.bufferSize - mixed;
			size = mixPos + toMix;

			for (i = mixPos; i < size; ++i) {
				sample = this.buffer[i];

				if (this.noisePos & 65536) {
					b = (this.rng & 1) ^ ((this.rng >> 2) & 1);
					this.rng = (this.rng >> 1) | (b << 16);
					this.noiseOutput ^= (b ? 0 : 65535);
					this.noisePos &= 65535;
				}

				this.volumeEnv = this.envData[Math.floor((this.envShape << 6) + (this.envPhase << 5) + (this.envPos >> 26))];

				this.voiceA.computeVolume();
				this.voiceB.computeVolume();
				this.voiceC.computeVolume();

				b = this.voiceA.enabled() & (this.noiseOutput | this.voiceA.mixNoise);
				var toto = this.voiceA.getvolume();
				sample.voiceA = (b) ? this.voiceA.getvolume() : -1;
				b = this.voiceB.enabled() & (this.noiseOutput | this.voiceB.mixNoise);
				sample.voiceB = (b) ? this.voiceB.getvolume() : -1;
				b = this.voiceC.enabled() & (this.noiseOutput | this.voiceC.mixNoise);
				sample.voiceC = (b) ? this.voiceC.getvolume() : -1;

				this.voiceA.next();
				this.voiceB.next();
				this.voiceC.next();

				this.noisePos += this.noiseStep;
				this.envPos += this.envStep;
				if (this.envPos > 2147483647)
					this.envPos -= 2147483647;
				if (this.envPhase == 0 && this.envPos < this.envStep) 
					envPhase = 1;

				if (this.syncBuzzer) {
					this.syncBuzzerPhase += this.syncBuzzerStep;

						if (this.syncBuzzerPhase & 1073741824) {
							this.envPos = 0;
							this.envPhase = 0;
							this.syncBuzzerPhase &= 0x3fffffff;
						}
				}
			}

			mixed += toMix;
			mixPos = size;
			this.samplesLeft -= toMix;
		}
		
		var l = event.outputBuffer.getChannelData(0);
		var r = event.outputBuffer.getChannelData(1);

		if (this.stereo) {
			for (i = 0; i < this.bufferSize; ++i) {
				sample = this.buffer[i];
				l[i]=sample.left();
				r[i]=sample.right();
			}
		} else {
			
			for (i = 0; i < this.bufferSize; ++i) {
				value = this.buffer[i].mono();
				l[i]=value;
				r[i]=value;
			}
		}
		
	}
	
	this.writeRegisters=function(){
		var p;

		this.registers[0] &= 255;
		this.registers[1] &= 15;
		this.voiceA.computeTone(this.registers[1], this.registers[0]);

		this.registers[2] &= 255;
		this.registers[3] &= 15;
		this.voiceB.computeTone(this.registers[3], this.registers[2]);

		this.registers[4] &= 255;
		this.registers[5] &= 15;
		this.voiceC.computeTone(this.registers[5], this.registers[4]);

		this.registers[6] &= 31;

		if (this.registers[6] < 3) {
			this.noisePos = 0;
			this.noiseOutput = 65535;
			this.noiseStep = 0;
		} else {
			p = this.clock / ((this.registers[6] << 3) * this.audioFreq);
			this.noiseStep = Math.floor(p * 32768);
		}

		this.registers[7] &= 255;

		this.voiceA.mixTone = (this.registers[7] & 1) ? 65535 : 0;
		this.voiceB.mixTone = (this.registers[7] & 2) ? 65535 : 0;
		this.voiceC.mixTone = (this.registers[7] & 4) ? 65535 : 0;

		this.voiceA.mixNoise = (this.registers[7] &  8) ? 65535 : 0;
		this.voiceB.mixNoise = (this.registers[7] & 16) ? 65535 : 0;
		this.voiceC.mixNoise = (this.registers[7] & 32) ? 65535 : 0;

		this.registers[8] &= 31;
		this.voiceA.setvolume(this.registers[8]);
		this.registers[9] &= 31;
		this.voiceB.setvolume(this.registers[9]);
		this.registers[10] &= 31;
		this.voiceC.setvolume(this.registers[10]);

		this.registers[11] &= 255;
		this.registers[12] &= 255;
		p = (this.registers[12] << 8) | this.registers[11];

		if (p < 3) {
			this.envStep = 0;
		} else {
			p = this.clock / ((p << 8) * this.audioFreq);
			this.envStep = Math.floor(p * 1073741824);
		}

		if (this.registers[13] == 255) {
			this.registers[13] = 0;
		} else {
			this.registers[13] &= 15;
			this.envPhase = 0;
			this.envPos = 0;
			this.envShape = this.registers[13];
		}
	}
	
	this.updateEffects=function(code, preDiv, count){
		var index=0;
		var tmpFreq=0;
		var voice=0;
		
		

		code   = this.registers[code] & 0xf0;
		preDiv = (this.registers[preDiv] >> 5) & 7;
		count  = this.registers[count];

		if (code & 0x30) {
			voice = ((code & 0x30) >> 4) - 1;

			switch (code & 0xc0) {
				case 0x00:
				case 0x80:
					break;
				case 0x40:
					index = this.registers[voice + 8] & 31;

					if ((index >= 0) && (index < this.song.drums)) {
						preDiv = YmConst_MFP_PREDIV[preDiv] * count;
						if (preDiv > 0) {
							tmpFreq = 2457600 / preDiv;

							if (voice == 0) {
								this.voiceA.drum = this.song.digidrums[index];
								this.voiceA.drumStart(tmpFreq);
							} else if (voice == 1) {
								this.voiceB.drum = this.song.digidrums[index];
								this.voiceB.drumStart(tmpFreq);
							} else if (voice == 2) {
								this.voiceC.drum = this.song.digidrums[index];
								this.voiceC.drumStart(tmpFreq);
							}
						}
					}
					break;
				case 0xc0:
					break;
			}
		}
	}

	
	this.syncBuzzerStart=function(timerFreq, shapeEnv){
		this.envShape = this.shapeEnv & 15;
		this.syncBuzzerStep = (this.timerFreq * 1073741824) / this.audioFreq;;
		this.syncBuzzerPhase = 0;
		this.syncBuzzer = true;
	}
    
	this.syncBuzzerStop=function(){
		this.syncBuzzer = false;
		this.syncBuzzerPhase = 0;
		this.syncBuzzerStep = 0;
	}
	
	this.stop=function(){
		
			this.reset();
			return true;
	}
	
	this.reset=function(){
		var i;

		this.voiceA = new YmChannel(this);
		this.voiceB = new YmChannel(this);
		this.voiceC = new YmChannel(this);
		this.samplesLeft = 0;
		this.frame = 0;

		this.registers = new Array();
		for (i = 0; i < 16; ++i) 
			this.registers[i]=0;
		this.registers[7] = 255;

		this.writeRegisters();
		this.volumeEnv = 0;

		this.noiseOutput = 65535;
		this.noisePos = 0;
		this.noiseStep = 0;
		this.rng = 1;

		this.envPhase = 0;
		this.envPos = 0;
		this.envShape = 0;
		this.envStep = 0;

		this.syncBuzzerStop();
	}
	
	this.init();
	this.reset();
	
	CODEF_AUDIO_NODE.connect(CODEF_AUDIO_CONTEXT.destination);


	
}
////////////////////////////////////////////////////////////////////
//
// Sample.js
//
////////////////////////////////////////////////////////////////////
function Sample(){
	this.voiceA = -1;
	this.voiceB = -1;
	this.voiceC = -1;



	this.mono=function(){
		var v = YmConst_MONO;
		var vol = 0.0;

		if (this.voiceA > -1) vol += v[this.voiceA];
		if (this.voiceB > -1) vol += v[this.voiceB];
		if (this.voiceC > -1) vol += v[this.voiceC];
		return vol;
	}

	this.left=function(){
		var v = YmConst_STEREO;
		var vol = 0.0;

		if (this.voiceA > -1) vol += v[this.voiceA];
		if (this.voiceB > -1) vol += v[this.voiceB];
		return vol;
	}

	this.right=function(){
		var v = YmConst_STEREO;
		var vol = 0.0;

		if (this.voiceB > -1) vol += v[this.voiceB];
		if (this.voiceC > -1) vol += v[this.voiceC];
		return vol;
	}
}
////////////////////////////////////////////////////////////////////
//
// YmChannel.js
//
////////////////////////////////////////////////////////////////////
function YmChannel(processor){
	this.mixNoise=0;
	this.mixTone=0;
	this.mode=0;
	this.position=0;
	this.step=0;

	this.digidrum=0;
	this.drum=0;
	this.drumPos=0;
	this.drumStep=0;

	this.processor = processor;
	this.vol=0;

	this.enabled=function(){
		return (this.position >> 30) | this.mixTone;
	}

	this.getvolume=function(){
		return (this.mode) ? this.processor.volumeEnv : this.vol;
	}

	this.setvolume=function(value){
		if(value & 16) 
			this.mode=true
		else 
			this.mode=false;
		this.vol = value;
	}

	this.next=function(){
		this.position += this.step;
		if (this.position > 2147483647) this.position -= 2147483647;
	}

	this.computeTone=function(high, low){
		var p = (high << 8) | low;

		if (p < 5) {
			this.position = 1073741824;
			this.step = 0;
		} else {
			p = this.processor.clock / ((p << 3) * this.processor.audioFreq);
			this.step = Math.floor(p * 1073741824);
		}
	}

	this.computeVolume=function(){
		var pos;

		if (this.digidrum) {
			pos = this.drumPos >> YmConst_DRUM_PREC;
			this.vol = this.drum.data[pos] / 16;//6;
			this.mixNoise = 65535;
			this.mixTone  = 65535;

			this.drumPos += this.drumStep;
			pos = this.drumPos >> YmConst_DRUM_PREC;
			if (pos >= this.drum.size) 
				this.digidrum = false;
		}
	}

	this.drumStart=function(drumFreq){
		this.digidrum = true;
		this.drumPos = 0;
		this.drumStep = (this.drumFreq << 15) / this.processor.audioFreq;
	}

	this.drumStop=function(){
		this.digidrum = false;
	}
	
}
////////////////////////////////////////////////////////////////////
//
// Digidrum.js
//
////////////////////////////////////////////////////////////////////
function Digidrum(size){
	this.data;
	this.repeatLen;
	this.size;
	this.wave=null;

	this.size = size;

	this.wave = new dataType();

	this.convert=function(attribs){
		var b;
		var i;
		this.data = new Array;

		if (attribs & YmConst_DRUM_4BITS) {
			for (i = 0; i < this.size; ++i) {
				b = (this.wave.readByte() & 15) >> 7;
				this.data[i] = YmConst_MONO[b];
			}
		} else {
			for (i = 0; i < this.size; ++i) {
				this.data[i] = this.wave.readByte();// / 255;
			}
		}
		this.wave = null;
	}

}

function dataType(){
	this.data;
	this.pos=0;
	this.endian="BIG";
	
	
	this.readBytes = function(offset, nb){
		var tmp="";
		for(var i=0;i<nb;i++){
			tmp+=this.data[offset+this.pos++];
		}
		return tmp;
	}
	
	this.readMultiByte = function(nb, type){
		if(type=="txt"){
			var tmp="";
			for(var i=0; i<nb; i++){
				tmp+=this.data[this.pos++]
			}
			return tmp;
		}
	}
	
	this.readInt = function(){
		var tmp1 = parseInt(this.data[this.pos+0].charCodeAt(0).toString(16),16);
		var tmp2 = parseInt(this.data[this.pos+1].charCodeAt(0).toString(16),16);
		var tmp3 = parseInt(this.data[this.pos+2].charCodeAt(0).toString(16),16);
		var tmp4 = parseInt(this.data[this.pos+3].charCodeAt(0).toString(16),16);
		if(this.endian=="BIG")
			var tmp = (tmp1<<24)|(tmp2<<16)|(tmp3<<8)|tmp4;
		else
			var tmp = (tmp4<<24)|(tmp3<<16)|(tmp2<<8)|tmp1;
		this.pos+=4;
		return tmp;
	}
	
	this.readShort = function(){
		var tmp1 = parseInt(this.data[this.pos+0].charCodeAt(0).toString(16),16);
		var tmp2 = parseInt(this.data[this.pos+1].charCodeAt(0).toString(16),16);
		var tmp = (tmp1<<8)|tmp2;
		this.pos+=2;
		return tmp;
	}
	this.readByte = function(){
		var tmp =  parseInt(this.data[this.pos].charCodeAt(0).toString(16),16)
		this.pos+=1;
		return tmp;
	}
	this.readString = function(){
		var tmp="";
		while(1){
			if(this.data[this.pos++].charCodeAt(0) !=0)
				tmp+=this.data[this.pos-1];
			else
				return tmp;
		}
	}

	this.substr= function(start, nb){
		return this.data.substr(start,nb);
	}
	
	this.bytesAvailable=function(){
		return this.length-this.pos;
	}
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//
// LHA depack routine
//
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function LHa() {
	this.data;

	this.source;
	this.buffer;
	this.output;
	this.srcSize;
	this.dstSize;
	this.srcPos;
	this.dstPos;

	this.c_Table;
	this.p_Table;
	this.c_Len;
	this.p_Len;
	this.l_Tree;
	this.r_Tree;

	this.bitBuffer;
	this.bitCount;
	this.subBuffer;
	this.blockSize;
	this.fillBufferSize;
	this.fillIndex;
	this.decodei;
	this.decodej;


	this.data = "";
	this.buffer = new Array();
	this.output = new Array();

	this.c_Table = new Array();
	this.p_Table = new Array();
	this.c_Len = new Array();
	this.p_Len = new Array();
	this.l_Tree = new Array();
	this.r_Tree = new Array();


	this.unpack=function(source){
		this.header = new LHaHeader(source);
		if (this.header.size == 0 || this.header.method != "-lh5-" || this.header.level != 0) return source.data;

		this.source = source;
		this.srcSize = this.header.packed;
		this.srcPos = this.source.pos;
		this.dstSize = this.header.original;

		this.fillBufferSize = 0;
		this.bitBuffer = 0;
		this.bitCount = 0;
		this.subBuffer = 0;
		this.fillBuffer(16);
		this.blockSize = 0;
		this.decodej = 0;

		var l = this.dstSize;
		var n;
		var np;

		while (l != 0) {
			n = l > 8192 ? 8192 : l;
			this.decode(n);
			np = n > this.dstSize ? this.dstSize : n;

			if (np > 0) {
				this.output.pos = 0;
				for(var yop=0;yop<np;yop++){
					this.data+=String.fromCharCode(this.output[yop]);
				}
				this.dstPos += np;
				this.dstSize -= np;
			}

			l -= n;
		}
      
		this.buffer="";
		this.output=new Array;
		return this.data;
	}

	this.decode=function(count){
		var c;
		var r=0;

		while (--this.decodej >= 0) {
			this.output[r] = this.output[this.decodei];
			this.decodei = ++this.decodei & 8191;
			if (++r == count) return;
		}

		for (;;) {
			c = this.decode_c();

			if (c <= 255) {
				this.output[r] = c;
				if (++r == count) return;
			} 
			else {
				this.decodej = c - 253;
				this.decodei = (r - this.decode_p() - 1) & 8191;

				while (--this.decodej >= 0) {
					this.output[r] = this.output[this.decodei];
					this.decodei = ++this.decodei & 8191;
					if (++r == count) return;
				}
			}
		}
	}

	this.decode_c=function(){
		var j;
		var mask=0;

		if (this.blockSize == 0) {
			this.blockSize = this.getBits(16);
			this.read_p(19, 5, 3);
			this.read_c();
			this.read_p(14, 4, -1);
		}

		this.blockSize--;
		j = this.c_Table[this.bitBuffer >> 4];

		if (j >= 510) {
			mask = 1 << 3;

			do {
				j = (this.bitBuffer & mask) ? this.r_Tree[j] : this.l_Tree[j];
				mask >>= 1;
			} while (j >= 510);
		}

		this.fillBuffer(this.c_Len[j]);
		return j & 0xffff;
	}
    


	this.decode_p=function(){
		var j = this.p_Table[this.bitBuffer >> 8];
		var mask=0;

		if (j >= 14) {
			mask = 1 << 7;

			do {
				j = (this.bitBuffer & mask) ? this.r_Tree[j] : this.l_Tree[j];
				mask >>= 1;
			} while (j >= 14);
		}

		this.fillBuffer(this.p_Len[j]);
		if (j != 0) j = (1 << (j - 1)) + this.getBits(j - 1);
			return j & 0xffff;
	}

	this.read_c=function(){
		var c;
		var i=0;
		var mask=0
		var n = this.getBits(9);

		if (n == 0) {
			c = this.getBits(9);
			for (i = 0; i < 510; ++i) this.c_Len[i] = 0;
			for (i = 0; i < 4096; ++i) this.c_Table[i] = c;
		} else {
			while (i < n) {
				c = this.p_Table[this.bitBuffer >> 8];

				if (c >= 19) {
					mask = 1 << 7;
					do {
						c = (this.bitBuffer & mask) ? this.r_Tree[c] : this.l_Tree[c];
					mask >>= 1;
					} while (c >= 19);
				}	

				this.fillBuffer(this.p_Len[c]);

				if (c <= 2) {
					if (c == 0)
						c = 1;
					else if (c == 1)
						c = this.getBits(4) + 3;
					else
						c = this.getBits(9) + 20;

					while (--c >= 0) this.c_Len[i++] = 0;
				} else {
				this.c_Len[i++] = c - 2;
				}
			}

			while (i < 510) this.c_Len[i++] = 0;
			this.makeTable(510, this.c_Len, 12, this.c_Table);
		}
	}

	this.read_p=function(nn, nbit, iSpecial){
		var c;
		var i=0;
		var mask=0;
		var n = this.getBits(nbit);

		if (n == 0) {
			c = this.getBits(nbit);
			for (i = 0; i < nn; ++i) this.p_Len[i] = 0;
			for (i = 0; i < 256; ++i) this.p_Table[i] = c;
		} else {
			while (i < n) {
				c = this.bitBuffer >> 13;

				if (c == 7) {
					mask = 1 << 12;

					while (mask & this.bitBuffer) {
						mask >>= 1;
						c++;
					}
				}

				this.fillBuffer(c < 7 ? 3 : c - 3);
				this.p_Len[i++] = c;

				if (i == iSpecial) {
					c = this.getBits(2);
					while (--c >= 0) this.p_Len[i++] = 0;
				}
			}

			while (i < nn) this.p_Len[i++] = 0;
			this.makeTable(nn, this.p_Len, 8, this.p_Table);
		}
	}

	this.getBits=function(n){
		var r = this.bitBuffer >> (16 - n);
		this.fillBuffer(n);
		return r & 0xffff;
	}

	this.fillBuffer=function(n){
		var np;

		this.bitBuffer = (this.bitBuffer << n) & 0xffff;

		while (n > this.bitCount) {
			this.bitBuffer |= this.subBuffer << (n -= this.bitCount);
			this.bitBuffer &= 0xffff;

			if (this.fillBufferSize == 0) {
				this.fillIndex = 0;
				np = this.srcSize > 4064 ? 4064 : this.srcSize;

				if (np > 0) {
					this.source.pos = this.srcPos;
					this.buffer=this.source.readBytes(0, np);
					this.srcPos += np;
					this.srcSize -= np;
				}

				this.fillBufferSize = np;
			}

			if (this.fillBufferSize > 0) {
				this.fillBufferSize--;
				this.subBuffer = this.buffer[this.fillIndex++].charCodeAt(0);
			} else {
				this.subBuffer = 0;
			}

			this.bitCount = 8;
		}

		this.bitBuffer |= this.subBuffer >> (this.bitCount -= n);
		this.bitBuffer &= 0xffff;
	}

	this.makeTable=function(nchar, bitlen, tablebits, table){
		var a = nchar;
		var h;
		var i;
		var j;
		var k;
		var l; 
		var n;
		var p;
		var t;
		var r;
		var c = new Array();
		var w = new Array();
		var s = new Array();
		var mask = 1 << (15 - tablebits);
		for (i = 0; i < nchar; ++i)
			c[i]=0;

		for (i = 0; i < nchar; ++i) c[bitlen[i]]++;

		s[1] = 0;
		for (i = 1; i < 17; ++i) s[i + 1] = (s[i] + (c[i] << (16 - i))) & 0xffff;

		if (s[17] != 0) return false;
		j = 16 - tablebits;

		for (i = 1; i <= tablebits; ++i) {
			s[i] >>= j;
			w[i] = 1 << (tablebits - i);
		}

		while (i < 17) w[i] = 1 << (16 - i++);
		i = s[tablebits + 1] >> j;

		if (i != 0) {
			k = 1 << tablebits;
			while (i != k) table[i++] = 0;
		}

		for (h = 0; h < nchar; ++h) {
			if ((l = bitlen[h]) == 0) continue;
			n = s[l] + w[l];

			if (l <= tablebits) {
				for (i = s[l]; i < n; ++i) table[i] = h;
			} else {
				i = l - tablebits;
				k = s[l];
				p = k >> j;
				t = table;

				while (i != 0) {
					if (t[p] == 0) {
						this.l_Tree[a] = 0;
						this.r_Tree[a] = 0;
						t[p] = a++;
					}

					r = (k & mask) ? this.r_Tree : this.l_Tree;
					k <<= 1;
					i--;
				}

				r[t[p]] = h;
			}
			s[l] = n;
		}

		return true;
	}
    
}


function LHaHeader(source) {
	this.size;
	this.checksum;
	this.method;
	this.packed;
	this.original;
	this.timeStamp;
	this.attribute;
	this.level;
	this.nameLength;
	this.name;

	source.endian = "LITTLE";
	source.pos = 0;

	this.size = source.readByte();
	this.checksum = source.readByte();
	this.method = source.readMultiByte(5, "txt");
	this.packed = source.readInt();
	this.original = source.readInt();
	this.timeStamp = source.readInt();
	this.attribute = source.readByte();
	this.level = source.readByte();
	this.nameLength = source.readByte();
	this.name = source.readMultiByte(this.nameLength, "txt");

	source.readShort();
}


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//
// MOD replay routine
//
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
(function(){
	window.neoart=Object.create(null);
	function createByteArray(b){
		var a=Object.create(null,{buffer:{value:null,writable:!0},view:{value:null,writable:!0},endian:{value:1,writable:!0},length:{value:0,writable:!0},currpos:{value:0,writable:!0},bytesAvailable:{get:function(){return this.length-this.currpos}},position:{get:function(){return this.currpos},set:function(a){if(0>a)a=0;else if(a>this.length)a=this.length;this.currpos=a}},readByte:{value:function(){var a=this.view.getInt8(this.currpos);this.currpos++;return a}},readShort:{value:function(){var a=this.view.getInt16(this.currpos,this.endian);this.currpos+=2;return a}},readInt:{value:function(){var a=this.view.getInt32(this.currpos,this.endian);this.currpos+=4;return a}},readUnsignedByte:{value:function(){var a=this.view.getUint8(this.currpos);this.currpos++;return a}},readUnsignedShort:{value:function(){var a=this.view.getUint16(this.currpos,this.endian);this.currpos+=2;return a}},readUnsignedInt:{value:function(){var a=this.view.getUint32(this.currpos,this.endian);this.currpos+=4;return a}},readBytes:{value:function(a,b,c){var d=this.currpos,c=c+d;if(c>this.length)c=this.length;for(;d<c;++d)a.setInt8(b++,this.view.getInt8(d))}},readString:{value:function(a){for(var b=this.currpos,c="",a=a+this.currpos;b<a;++b)c+=String.fromCharCode(this.view.getUint8(b));this.currpos=a;return c}},writeByte:{value:function(a){this.view.setInt8(this.currpos,a);this.currpos++}},writeInt:{value:function(a){this.view.setInt32(this.currpos,a,this.endian);this.currpos+=4}}});
		a.buffer=b;
		a.view=new DataView(b);
		a.length=b.byteLength;
		return Object.seal(a)
	}
	
	function createSample(){
		return Object.create(null,{l:{value:0,writable:!0},r:{value:0,writable:!0},next:{value:null,writable:!0}})
	}
	
	function createCoreMixer(){
		return Object.create(null,{player:{value:null,writable:!0},channels:{value:[],writable:!0},buffer:{value:[],writable:!0},samplesTick:{value:0,writable:!0},samplesLeft:{value:0,writable:!0},completed:{value:0,writable:!0},remains:{value:0,writable:!0},bufferSize:{get:function(){return this.buffer.length},set:function(b){var a;a=this.buffer.length||0;if(b!=a&&(this.buffer.length=b,b>a)){this.buffer[a]=createSample();for(a=++a;a<b;++a)this.buffer[a]=this.buffer[a-1].next=createSample()}}},complete:{get:function(){return this.completed},set:function(b){this.completed=b^this.player.loopSong}},core_initialize:{value:function(){var b=this.channels[0],a=this.buffer[0];for(this.samplesLeft=this.remains=this.completed=0;b;)b.initialize(),b=b.next;for(;a;)a.l=a.r=0,a=a.next}},reset:{configurable:!0,value:function(){}}})
	}
	
	function createCorePlayer(){
		var b=Object.create(null,{context:{value:null,writable:!0},node:{value:null,writable:!0},analyse:{value:0,writable:!0},sampleRate:{value:0,writable:!0},version:{value:0,writable:!0},title:{value:"",writable:!0},channels:{value:0,writable:!0},loopSong:{value:1,writable:!0},speed:{value:0,writable:!0},tempo:{value:0,writable:!0},mixer:{value:null,writable:!0},tick:{value:0,writable:!0},timer:{value:0,writable:!0},endian:{value:0,writable:!0},paused:{value:0,writable:!0},callback:{value:null,writable:!0},quality:{configurable:!0,set:function(a){this.callback=a?this.mixer.accurate.bind(this.mixer):this.mixer.fast.bind(this.mixer)}},toggle:{set:function(a){this.mixer.channels[a].mute^=1}},core_initialize:{value:function(){this.timer=this.speed;this.tick=0;this.mixer.initialize();this.mixer.samplesTick=2.5*this.sampleRate/this.tempo>>0}},load:{value:function(a){this.mixer.reset();this.version=0;a=createByteArray(a);a.endian=this.endian;this.loader(a);this.version&&this.setup();return this.version}},play:{value:function(){var a=this.callback,b;if(this.version)this.paused?this.paused=0:(this.initialize(),this.node=this.context.createJavaScriptNode(this.mixer.bufferSize),this.node.onaudioprocess=function(b){a(b)}),this.analyse?(node=neoart.analyserNode=this.context.createAnalyser(),this.node.connect(node),node.connect(this.context.destination)):this.node.connect(this.context.destination),b=document.createEvent("Event"),b.initEvent("flodPlay",!0,!1),document.dispatchEvent(b)}},pause:{value:function(){if(this.node){this.node.disconnect();this.paused=1;var a=document.createEvent("Event");a.initEvent("flodPause",!0,!1);document.dispatchEvent(a)}}},stop:{value:function(){if(this.node){this.node.disconnect();this.node.onaudioprocess=this.node=null;this.paused=0;var a=document.createEvent("Event");a.initEvent("flodStop",!0,!1);document.dispatchEvent(a)}}},setup:{configurable:!0,value:function(){}}});
		if(!window.neoart.AudioContext)window.neoart.AudioContext=new webkitAudioContext;
		b.context=window.neoart.AudioContext;
		b.sampleRate=b.context.sampleRate;
		return b
	};
	
	function createAmigaChannel(c){
		c=0==(++c&2)?-1:1;
		return Object.create(null,{next:{value:null,writable:!0},mute:{value:0,writable:!0},panning:{value:c,writable:!0},delay:{value:0,writable:!0},pointer:{value:0,writable:!0},length:{value:0,writable:!0},audena:{value:0,writable:!0},audcnt:{value:0,writable:!0},audloc:{value:0,writable:!0},audper:{value:0,writable:!0},audvol:{value:0,writable:!0},timer:{value:0,writable:!0},level:{value:c,writable:!0},ldata:{value:0,writable:!0},rdata:{value:0,writable:!0},enabled:{set:function(a){if(a!=this.audena)this.audena=a,this.audloc=this.pointer,this.audcnt=this.pointer+this.length,this.timer=1,a&&(this.delay+=2)}},period:{set:function(a){if(1>a||65536<a)a=65536;this.audper=a}},volume:{set:function(a){0>a?a=0:64<a&&(a=64);this.audvol=a}},initialize:{value:function(){this.audloc=this.audcnt=this.audena=0;this.audper=50;this.length=this.pointer=this.delay=this.rdata=this.ldata=this.timer=this.audvol=0}}})
	}
	
	function createAmigaFilter(){
		return Object.create(null,{active:{value:0,writable:!0},forced:{value:-1,writable:!0},l0:{value:0,writable:!0},l1:{value:0,writable:!0},l2:{value:0,writable:!0},l3:{value:0,writable:!0},l4:{value:0,writable:!0},r0:{value:0,writable:!0},r1:{value:0,writable:!0},r2:{value:0,writable:!0},r3:{value:0,writable:!0},r4:{value:0,writable:!0},initialize:{value:function(){this.r0=this.r1=this.r2=this.r3=this.r4=this.l0=this.l1=this.l2=this.l3=this.l4=0}},process:{value:function(c,a){var b=0.5139651662784244;if(0==c)this.l0=0.4860348337215757*a.l+b*this.l0,this.r0=0.4860348337215757*a.r+b*this.r0,b=0.06850445132502514,a.l=this.l1=0.9314955486749749*this.l0+b*this.l1,a.r=this.r1=0.9314955486749749*this.r0+b*this.r1;if(0<(this.active|this.forced))b=0.47866541564678,this.l2=0.52133458435322*a.l+b*this.l2,this.r2=0.52133458435322*a.r+b*this.r2,this.l3=0.52133458435322*this.l2+b*this.l3,this.r3=0.52133458435322*this.r2+b*this.r3,a.l=this.l4=0.52133458435322*this.l3+b*this.l4,a.r=this.r4=0.52133458435322*this.r3+b*this.r4;if(1<a.l)a.l=1;else if(-1>a.l)a.l=-1;if(1<a.r)a.r=1;else if(-1>a.r)a.r=-1}}})
}

function createAmiga(){
	var c=createCoreMixer();
	Object.defineProperties(c,{filter:{value:null,writable:!0},model:{value:1,writable:!0},memory:{value:[],writable:!0},loopPtr:{value:0,writable:!0},loopLen:{value:4,writable:!0},clock:{value:0,writable:!0},master:{value:0,writable:!0},ready:{value:0,writable:!0},volume:{set:function(a){0<a?(64<a&&(a=64),this.master=0.00390625*(a/64>>0)):this.master=0}},initialize:{value:function(){var a=this.memory.length,b=a+this.loopLen;this.core_initialize();this.filter.initialize();if(!this.ready){this.ready=1;for(this.loopPtr=a;a<b;++a)this.memory[a]=0}}},reset:{configurable:!1,value:function(){this.ready=0;this.memory.length=0}},store:{value:function(a,b,c){var j,e,g=a.position,h=this.memory.length;if(c)a.position=c;e=a.position+b;e>=a.length&&(j=e-a.length,b=a.length-a.position);for(e=h,b+=h;e<b;++e)this.memory[e]=a.readByte();for(b+=j;e<b;++e)this.memory[e]=0;if(c)a.position=g;return h}},fast:{value:function(a){var b,c,j=this.memory,e,g=0,h,l=0,m,d,f=this.bufferSize,n,k,i;if(this.completed){if(!this.remains){this.player.stop();return}f=this.remains}for(;g<f;){if(!this.samplesLeft&&(this.player.process(),this.samplesLeft=this.samplesTick,this.completed&&(f=g+this.samplesTick,f>this.bufferSize)))this.remains=f-this.bufferSize,f=this.bufferSize;k=this.samplesLeft;g+k>=f&&(k=f-g);h=l+k;for(b=this.channels[0];b;){d=this.buffer[l];if(b.audena){n=b.audper/this.clock;i=b.audvol*this.master;e=i*(1-b.level);m=i*(1+b.level);for(c=l;c<h;++c)if(b.delay)b.delay--;else{if(1>--b.timer){if(!b.mute)i=0.0078125*j[b.audloc],b.ldata=i*e,b.rdata=i*m;b.audloc++;b.timer+=n;if(b.audloc>=b.audcnt)b.audloc=b.pointer,b.audcnt=b.pointer+b.length}d.l+=b.ldata;d.r+=b.rdata;d=d.next}}else for(c=l;c<h;++c)d.l+=b.ldata,d.r+=b.rdata,d=d.next;b=b.next}l=h;g+=k;this.samplesLeft-=k}d=this.buffer[0];b=a.outputBuffer.getChannelData(0);a=a.outputBuffer.getChannelData(1);j=this.filter;i=this.model;for(c=0;c<f;++c)j.process(i,d),b[c]=d.l,a[c]=d.r,d.l=d.r=0,d=d.next}},createRow:{configurable:!0,value:function(){return Object.create(null,{note:{value:0,writable:!0},sample:{value:0,writable:!0},effect:{value:0,writable:!0},param:{value:0,writable:!0}})}},createSample:{configurable:!0,value:function(){return Object.create(null,{name:{value:"",writable:!0},length:{value:0,writable:!0},loop:{value:0,writable:!0},repeat:{value:0,writable:!0},volume:{value:0,writable:!0},pointer:{value:0,writable:!0},loopPtr:{value:0,writable:!0}})}}});
	c.bufferSize=8192;
	c.filter=createAmigaFilter();
	c.master=0.00396025;
	c.channels[0]=createAmigaChannel(0);
	c.channels[0].next=c.channels[1]=createAmigaChannel(1);
	c.channels[1].next=c.channels[2]=createAmigaChannel(2);
	c.channels[2].next=c.channels[3]=createAmigaChannel(3);
	return Object.seal(c)
	
}

function createAmigaPlayer(c){
	var a=createCorePlayer();
	Object.defineProperties(a,{playSong:{value:0,writable:!0},lastSong:{value:1,writable:!0},standard:{value:0,writable:!0},quality:{configurable:!1,set:function(){this.callback=this.mixer.fast.bind(this.mixer)}},stereo:{set:function(b){var a=this.mixer.channels[0];for(0>b?b=0:1<b&&(b=1);a;)a.level=b*a.panning,a=a.next}},volume:{set:function(a){0>a?a=0:1<a&&(a=1);this.mixer.master=0.00390625*a}},mode:{value:function(a){(this.standard=a)?(this.mixer.clock=3579545/this.sampleRate,this.mixer.samplesTick=735):(this.mixer.clock=3546895/this.sampleRate,this.mixer.samplesTick=882)}}});
	a.mixer=c||createAmiga();
	a.mixer.player=a;a.mode(0);
	a.endian=0;
	a.quality=0;
	a.speed=6;
	a.tempo=125;
	return a
	
}

function createSBChannel(){
	return Object.create(null,{next:{value:null,writable:!0},mute:{value:0,writable:!0},enabled:{value:0,writable:!0},sample:{value:null,writable:!0},length:{value:0,writable:!0},index:{value:0,writable:!0},pointer:{value:0,writable:!0},delta:{value:0,writable:!0},fraction:{value:0,writable:!0},speed:{value:0,writable:!0},dir:{value:0,writable:!0},oldSample:{value:null,writable:!0},oldLength:{value:0,writable:!0},oldPointer:{value:0,writable:!0},oldFraction:{value:0,writable:!0},oldSpeed:{value:0,writable:!0},oldDir:{value:0,writable:!0},volume:{value:0,writable:!0},lvol:{value:0,writable:!0},rvol:{value:0,writable:!0},panning:{value:128,writable:!0},lpan:{value:0.5,writable:!0},rpan:{value:0.5,writable:!0},ldata:{value:0,writable:!0},rdata:{value:0,writable:!0},mixCounter:{value:0,writable:!0},lmixRampU:{value:0,writable:!0},lmixDeltaU:{value:0,writable:!0},rmixRampU:{value:0,writable:!0},rmixDeltaU:{value:0,writable:!0},lmixRampD:{value:0,writable:!0},lmixDeltaD:{value:0,writable:!0},rmixRampD:{value:0,writable:!0},rmixDeltaD:{value:0,writable:!0},volCounter:{value:0,writable:!0},lvolDelta:{value:0,writable:!0},rvolDelta:{value:0,writable:!0},panCounter:{value:0,writable:!0},lpanDelta:{value:0,writable:!0},rpanDelta:{value:0,writable:!0},initialize:{value:function(){this.enabled=0;this.sample=null;this.dir=this.speed=this.fraction=this.delta=this.pointer=this.index=this.length=0;this.oldSample=null;this.rvol=this.lvol=this.volume=this.oldDir=this.oldSpeed=this.oldFraction=this.oldPointer=this.oldLength=0;this.panning=128;this.rpan=this.lpan=0.5;this.rpanDelta=this.lpanDelta=this.panCounter=this.rvolDelta=this.lvolDelta=this.volCounter=this.rmixDeltaD=this.rmixRampD=this.lmixDeltaD=this.lmixRampD=this.rmixDeltaU=this.rmixRampU=this.lmixDeltaU=this.lmixRampU=this.mixCounter=this.rdata=this.ldata=0}}})
	}


	function createSoundblaster(){
		var q=createCoreMixer();
		Object.defineProperties(q,{setup:{value:function(b){var a=1;this.channels=[];this.channels.length=b;for(this.channels[0]=createSBChannel();a<b;++a)this.channels[a]=this.channels[a-1].next=createSBChannel()}},initialize:{value:function(){this.core_initialize()}},fast:{value:function(b){var a,g,e,f=0,k,m=0,l,d,i=this.bufferSize,h,j;if(this.completed){if(!this.remains){this.player.stop();return}i=this.remains}for(;f<i;){if(!this.samplesLeft&&(this.player.process(),this.player.fast(),this.samplesLeft=this.samplesTick,this.completed&&(i=f+this.samplesTick,i>this.bufferSize)))this.remains=i-this.bufferSize,i=this.bufferSize;h=this.samplesLeft;f+h>=i&&(h=i-f);k=m+h;for(a=this.channels[0];a;){if(a.enabled){l=a.sample;g=l.data;d=this.buffer[m];for(e=m;e<k;++e){if(a.index!=a.pointer){if(a.index>=a.length)if(l.loopMode){if(a.pointer=l.loopStart+(a.index-a.length),a.length=l.length,2==l.loopMode)a.dir=a.dir?0:l.length+l.loopStart-1}else{a.enabled=0;break}else a.pointer=a.index;a.mute?(a.ldata=0,a.rdata=0):(j=a.dir?g[a.dir-a.pointer]:g[a.pointer],a.ldata=j*a.lvol,a.rdata=j*a.rvol)}a.index=a.pointer+a.delta;if(1<=(a.fraction+=a.speed))a.index++,a.fraction--;d.l+=a.ldata;d.r+=a.rdata;d=d.next}}a=a.next}m=k;f+=h;this.samplesLeft-=h}d=this.buffer[0];a=b.outputBuffer.getChannelData(0);b=b.outputBuffer.getChannelData(1);for(e=0;e<i;++e){if(1<d.l)d.l=1;else if(-1>d.l)d.l=-1;if(1<d.r)d.r=1;else if(-1>d.r)d.r=-1;a[e]=d.l;b[e]=d.r;d.l=d.r=0;d=d.next}}},accurate:{value:function(b){var a,g,e,f,k,m=0,l,d=0,i,h,j,c,o=this.bufferSize,p,n;if(this.completed){if(!this.remains){this.player.stop();return}o=this.remains}for(;m<o;){if(!this.samplesLeft&&(this.player.process(),this.player.accurate(),this.samplesLeft=this.samplesTick,this.completed&&(o=m+this.samplesTick,o>this.bufferSize)))this.remains=o-this.bufferSize,o=this.bufferSize;p=this.samplesLeft;m+p>=o&&(p=o-m);l=d+p;for(a=this.channels[0];a;){if(a.enabled){h=a.sample;g=h.data;if(j=a.oldSample)e=j.data;c=this.buffer[d];for(k=d;k<l;++k){n=a.mute?0:g[a.pointer];n+=(g[a.pointer+a.dir]-n)*a.fraction;if(1<=(a.fraction+=a.speed))if(f=a.fraction>>0,a.fraction-=f,0<a.dir){if(a.pointer+=f,a.pointer>a.length)a.fraction+=a.pointer-a.length,a.pointer=a.length}else if(a.pointer-=f,a.pointer<a.length)a.fraction+=a.length-a.pointer,a.pointer=a.length;if(a.mixCounter){if(j){i=a.mute?0:e[a.oldPointer];i+=(e[a.oldPointer+a.oldDir]-i)*a.oldFraction;if(1<(a.oldFraction+=a.oldSpeed))if(f=a.oldFraction>>0,a.oldFraction-=f,0<a.oldDir){if(a.oldPointer+=f,a.oldPointer>a.oldLength)a.oldFraction+=a.oldPointer-a.oldLength,a.oldPointer=a.oldLength}else if(a.oldPointer-=f,a.oldPointer<a.oldLength)a.oldFraction+=a.oldLength-a.oldPointer,a.oldPointer=a.oldLength;c.l+=n*a.lmixRampU+i*a.lmixRampD;c.r+=n*a.rmixRampU+i*a.rmixRampD;a.lmixRampD-=a.lmixDeltaD;a.rmixRampD-=a.rmixDeltaD}else c.l+=n*a.lmixRampU,c.r+=n*a.rmixRampU;a.lmixRampU+=a.lmixDeltaU;a.rmixRampU+=a.rmixDeltaU;a.mixCounter--;if(a.oldPointer==a.oldLength)j.loopMode?1==j.loopMode?(a.oldPointer=j.loopStart,a.oldLength=j.length):0<a.oldDir?(a.oldPointer=j.length-1,a.oldLength=j.loopStart,a.oldDir=-1):(a.oldFraction-=1,a.oldPointer=j.loopStart,a.oldLength=j.length,a.oldDir=1):(j=null,a.oldPointer=0)}else if(c.l+=n*a.lvol,c.r+=n*a.rvol,a.volCounter)a.lvol+=a.lvolDelta,a.rvol+=a.rvolDelta,a.volCounter--;else if(a.panCounter)a.lpan+=a.lpanDelta,a.rpan+=a.rpanDelta,a.panCounter--,a.lvol=a.volume*a.lpan,a.rvol=a.volume*a.rpan;if(a.pointer==a.length)if(h.loopMode)1==h.loopMode?(a.pointer=h.loopStart,a.length=h.length):0<a.dir?(a.pointer=h.length-1,a.length=h.loopStart,a.dir=-1):(a.fraction-=1,a.pointer=h.loopStart,a.length=h.length,a.dir=1);else{a.enabled=0;break}c=c.next}}a=a.next}d=l;m+=p;this.samplesLeft-=p}c=this.buffer[0];a=b.outputBuffer.getChannelData(0);b=b.outputBuffer.getChannelData(1);for(k=0;k<o;++k){if(1<c.l)c.l=1;else if(-1>c.l)c.l=-1;if(1<c.r)c.r=1;else if(-1>c.r)c.r=-1;a[k]=c.l;b[k]=c.r;c.l=c.r=0;c=c.next}}},createSample:{value:function(){return Object.create(null,{name:{value:"",writable:!0},bits:{value:8,writable:!0},volume:{value:0,writable:!0},panning:{value:0,writable:!0},finetune:{value:0,writable:!0},relative:{value:0,writable:!0},length:{value:0,writable:!0},data:{value:[],writable:!0},loopMode:{value:0,writable:!0},loopStart:{value:0,writable:!0},loopLen:{value:0,writable:!0},store:{value:function(b){var a=0,g,e=this.length,f;if(!this.loopLen)this.loopMode=0;f=b.position;this.data=new Float32Array;this.loopMode?(e=this.loopStart+this.loopLen,this.data.length=e+1):this.data.length=this.length+1;if(8==this.bits){f+e>b.length&&(e=b.length-f);for(g=0;g<e;g++)a=b.readByte()+a,-128>a?a+=256:127<a&&(a-=256),this.data[g]=0.0078125*a}else{f+(e<<1)>b.length&&(e=b.length-f>>1);for(g=0;g<e;g++)a=b.readShort()+a,-32768>a?a+=65536:32767<a&&(a-=65536),this.data[g]=3.051758E-5*a}a=f+length;this.loopMode?(this.length=this.loopStart+this.loopLen,this.data[e]=1==this.loopMode?this.data[this.loopStart]:this.data[e-1]):this.data[this.length]=0;if(e!=this.length){f=this.data[e-1];for(g=e;g<this.length;g++)this.data[g]=f}b.position=a<b.length?a:b.length-1}}})}}});
		q.bufferSize=8192;
		return Object.seal(q)
		
	}

	function createSBPlayer(q){
		var b=createCorePlayer();
		Object.defineProperties(b,{track:{value:null,writable:!0},length:{value:0,writable:!0},restart:{value:0,writable:!0},master:{value:0,writable:!0},setup:{configurable:!1,value:function(){this.mixer.setup(this.channels)}}});
		b.mixer=q||createSoundblaster();
		b.mixer.player=b;
		b.endian=1;
		b.quality=1;
		return b
	}
	
	(function(){
		function i(f){
			return Object.create(null,{index:{value:f,writable:!0},next:{value:null,writable:!0},channel:{value:null,writable:!0},sample:{value:null,writable:!0},enabled:{value:0,writable:!0},period:{value:0,writable:!0},effect:{value:0,writable:!0},param:{value:0,writable:!0},volume:{value:0,writable:!0},portaDir:{value:0,writable:!0},portaPeriod:{value:0,writable:!0},portaSpeed:{value:0,writable:!0},vibratoPos:{value:0,writable:!0},vibratoSpeed:{value:0,writable:!0},initialize:{value:function(){this.sample=this.channel=null;this.vibratoSpeed=this.vibratoPos=this.portaSpeed=this.portaPeriod=this.portaDir=this.volume=this.param=this.effect=this.period=this.enabled=0}}})
		}
		
		window.neoart.createMKPlayer=function(f){
			f=createAmigaPlayer(f);
			Object.defineProperties(f,{id:{value:"MKPlayer"},track:{value:null,writable:!0},patterns:{value:[],writable:!0},samples:{value:[],writable:!0},length:{value:0,writable:!0},restart:{value:0,writable:!0},voices:{value:[],writable:!0},trackPos:{value:0,writable:!0},patternPos:{value:0,writable:!0},jumpFlag:{value:0,writable:!0},vibratoDepth:{value:0,writable:!0},restartSave:{value:0,writable:!0},force:{set:function(b){b<j?b=j:b>h&&(b=h);this.version=b;this.vibratoDepth=b==h?6:7;b==k?(this.restartSave=this.restart,this.restart=0):(this.restart=this.restartSave,this.restartSave=0)}},initialize:{value:function(){var b=this.voices[0];this.core_initialize();this.force=this.version;this.timer=6;for(this.jumpFlag=this.patternPos=this.trackPos=0;b;)b.initialize(),b.channel=this.mixer.channels[b.index],b.sample=this.samples[0],b=b.next}},loader:{value:function(b){var f=0,e,c,d=0,g;if(!(2150>b.length)&&(b.position=1080,e=b.readString(4),!("M.K."!=e&&"FLT4"!=e))){b.position=0;this.title=b.readString(20);this.version=j;b.position+=22;for(e=1;32>e;++e)if(g=b.readUnsignedShort()){if(c=this.mixer.createSample(),b.position-=24,c.name=b.readString(22),c.length=g<<1,b.position+=3,c.volume=b.readUnsignedByte(),c.loop=b.readUnsignedShort()<<1,c.repeat=b.readUnsignedShort()<<1,b.position+=22,c.pointer=d,d+=c.length,this.samples[e]=c,32768<c.length)this.version=m}else this.samples[e]=null,b.position+=28;b.position=950;this.length=b.readUnsignedByte();g=b.readUnsignedByte();this.restart=g<length?g:0;for(e=0;128>e;++e)g=b.readUnsignedByte()<<8,this.track[e]=g,g>f&&(f=g);b.position=1084;f+=256;this.patterns=[];this.patterns.length=f;for(e=0;e<f;++e){c=this.mixer.createRow();g=b.readUnsignedInt();c.note=g>>16&4095;c.effect=g>>8&15;c.sample=g>>24&240|g>>12&15;c.param=g&255;this.patterns[e]=c;if(31<c.sample||!this.samples[c.sample])c.sample=0;if(3==c.effect||4==c.effect)this.version=k;if(5==c.effect||6==c.effect)this.version=h;if(6<c.effect&&10>c.effect){this.version=0;return}}this.mixer.store(b,d);for(e=1;32>e;++e)if(c=this.samples[e]){if(-1<c.name.indexOf("2.0"))this.version=h;c.loop?(c.loopPtr=c.pointer+c.loop,c.length=c.loop+c.repeat):(c.loopPtr=this.mixer.memory.length,c.repeat=2);d=c.pointer+4;for(b=c.pointer;b<d;++b)this.mixer.memory[b]=0}c=this.mixer.createSample();c.pointer=c.loopPtr=this.mixer.memory.length;c.length=c.repeat=2;this.samples[0]=c;if(this.version<h&&this.restart)this.version=n}}},process:{value:function(){var b,f,e,c,d,g,a=this.voices[0];if(this.tick)for(;a;){b=a.channel;if(0==a.effect&&0==a.param)b.period=a.period;else{switch(a.effect){case 0:d=this.tick%3;if(!d){b.period=a.period;a=a.next;continue}d=1==d?a.param>>4:a.param&15;c=a.period&4095;e=37-d;for(f=0;f<e;++f)if(c>=l[f]){b.period=l[f+d];break}break;case 1:a.period-=a.param;if(113>a.period)a.period=113;b.period=a.period;break;case 2:a.period+=a.param;if(856<a.period)a.period=856;b.period=a.period;break;case 3:case 5:if(5==a.effect)g=1;else if(a.param)a.portaSpeed=a.param,a.param=0;if(a.portaPeriod)if(a.portaDir){if(a.period-=a.portaSpeed,a.period<=a.portaPeriod)a.period=a.portaPeriod,a.portaPeriod=0}else if(a.period+=a.portaSpeed,a.period>=a.portaPeriod)a.period=a.portaPeriod,a.portaPeriod=0;b.period=a.period;break;case 4:case 6:if(6==a.effect)g=1;else if(a.param)a.vibratoSpeed=a.param;d=a.vibratoPos>>2&31;d=(a.vibratoSpeed&15)*o[d]>>this.vibratoDepth;b.period=127<a.vibratoPos?a.period-d:a.period+d;d=a.vibratoSpeed>>2&60;a.vibratoPos=a.vibratoPos+d&255;break;case 10:g=1}if(g){d=a.param>>4;g=0;a.volume=d?a.volume+d:a.volume-(a.param&15);if(0>a.volume)a.volume=0;else if(64<a.volume)a.volume=64;b.volume=a.volume}}a=a.next}else for(f=this.track[this.trackPos]+this.patternPos;a;){b=a.channel;a.enabled=0;d=this.patterns[f+a.index];a.effect=d.effect;a.param=d.param;d.sample?(e=a.sample=this.samples[d.sample],b.volume=a.volume=e.volume):e=a.sample;if(d.note)3==a.effect||5==a.effect?d.note<a.period?(a.portaDir=1,a.portaPeriod=d.note):d.note>a.period?(a.portaDir=0,a.portaPeriod=d.note):a.portaPeriod=0:(a.enabled=1,a.vibratoPos=0,b.enabled=0,b.pointer=e.pointer,b.length=e.length,b.period=a.period=d.note);switch(a.effect){case 11:this.trackPos=a.param-1;this.jumpFlag^=1;break;case 12:b.volume=a.param;if(this.version==h)a.volume=a.param;break;case 13:this.jumpFlag^=1;break;case 14:this.mixer.filter.active=a.param^1;break;case 15:d=a.param,1>d?d=1:31<d&&(d=31),this.timer=d,this.tick=0}if(a.enabled)b.enabled=1;b.pointer=e.loopPtr;b.length=e.repeat;a=a.next}if(++this.tick==this.timer&&(this.tick=0,this.patternPos+=4,256==this.patternPos||this.jumpFlag))if(this.patternPos=this.jumpFlag=0,this.trackPos=++this.trackPos&127,this.trackPos==this.length)this.trackPos=this.restart,this.mixer.complete=1}}});
			f.track=new Uint32Array(128);
			f.voices[0]=i(0);
			f.voices[0].next=f.voices[1]=i(1);
			f.voices[1].next=f.voices[2]=i(2);
			f.voices[2].next=f.voices[3]=i(3);
			return Object.seal(f)
			
		}
		var j=1,m=2,k=3,n=4,h=5,l=[856,808,762,720,678,640,604,570,538,508,480,453,428,404,381,360,339,320,302,285,269,254,240,226,214,202,190,180,170,160,151,143,135,127,120,113,0],o=[0,24,49,74,97,120,141,161,180,197,212,224,235,244,250,253,255,253,250,244,235,224,212,197,180,161,141,120,97,74,49,24]
	})();
	
	(function(){
		function j(h){
			return Object.create(null,{index:{value:h,writable:!0},next:{value:null,writable:!0},sample:{value:null,writable:!0},enabled:{value:0,writable:!0},pattern:{value:0,writable:!0},soundTranspose:{value:0,writable:!0},transpose:{value:0,writable:!0},patStep:{value:0,writable:!0},frqStep:{value:0,writable:!0},frqPos:{value:0,writable:!0},frqSustain:{value:0,writable:!0},frqTranspose:{value:0,writable:!0},volStep:{value:0,writable:!0},volPos:{value:0,writable:!0},volCtr:{value:0,writable:!0},volSpeed:{value:0,writable:!0},volSustain:{value:0,writable:!0},note:{value:0,writable:!0},pitch:{value:0,writable:!0},volume:{value:0,writable:!0},pitchBendFlag:{value:0,writable:!0},pitchBendSpeed:{value:0,writable:!0},pitchBendTime:{value:0,writable:!0},portamentoFlag:{value:0,writable:!0},portamento:{value:0,writable:!0},volBendFlag:{value:0,writable:!0},volBendSpeed:{value:0,writable:!0},volBendTime:{value:0,writable:!0},vibratoFlag:{value:0,writable:!0},vibratoSpeed:{value:0,writable:!0},vibratoDepth:{value:0,writable:!0},vibratoDelay:{value:0,writable:!0},vibrato:{value:0,writable:!0},initialize:{value:function(){this.sample=null;this.volPos=this.volStep=this.frqTranspose=this.frqSustain=this.frqPos=this.frqStep=this.patStep=this.transpose=this.soundTranspose=this.pattern=this.enabled=0;this.volSpeed=this.volCtr=1;this.vibrato=this.vibratoDelay=this.vibratoDepth=this.vibratoSpeed=this.vibratoFlag=this.volBendTime=this.volBendSpeed=this.volBendFlag=this.portamento=this.portamentoFlag=this.pitchBendTime=this.pitchBendSpeed=this.pitchBendFlag=this.volume=this.pitch=this.note=this.volSustain=0}},volumeBend:{value:function(){if(this.volBendFlag^=1)if(this.volBendTime--,this.volume+=this.volBendSpeed,0>this.volume||64<this.volume)this.volBendTime=0}}})
		}
		window.neoart.createFCPlayer=function(h){
			h=createAmigaPlayer(h);
			Object.defineProperties(h,{id:{value:"FCPlayer"},seqs:{value:null,writable:!0},pats:{value:null,writable:!0},vols:{value:null,writable:!0},frqs:{value:null,writable:!0},length:{value:0,writable:!0},samples:{value:[],writable:!0},voices:{value:[],writable:!0},initialize:{value:function(){var b=this.voices[0];this.core_initialize();this.seqs.position=0;this.pats.position=0;this.vols.position=0;for(this.frqs.position=0;b;)b.initialize(),b.channel=this.mixer.channels[b.index],b.pattern=this.seqs.readUnsignedByte()<<6,b.transpose=this.seqs.readByte(),b.soundTranspose=this.seqs.readByte(),b=b.next;this.timer=this.seqs.readUnsignedByte();if(0==this.timer)this.timer=3;this.tick=this.timer}},loader:{value:function(b){var g,d,e,f,a,c,i,h,j;d=b.readString(4);if("SMOD"==d)this.version=k;else if("FC14"==d)this.version=m;else return;b.position=4;this.length=b.readUnsignedInt();b.position=this.version==k?100:180;this.seqs=createByteArray(new ArrayBuffer(this.length));b.readBytes(this.seqs.view,0,this.length);this.length=this.length/13>>0;b.position=12;e=b.readUnsignedInt();b.position=8;b.position=b.readUnsignedInt();this.pats=createByteArray(new ArrayBuffer(e+1));b.readBytes(this.pats.view,0,e);b.position=20;e=b.readUnsignedInt();b.position=16;b.position=b.readUnsignedInt();this.frqs=createByteArray(new ArrayBuffer(e+9));this.frqs.writeInt(16777216);this.frqs.writeInt(225);b.readBytes(this.frqs.view,8,e);this.frqs.position=this.frqs.length-1;this.frqs.writeByte(225);this.frqs.position=0;b.position=28;e=b.readUnsignedInt();b.position=24;b.position=b.readUnsignedInt();this.vols=createByteArray(new ArrayBuffer(e+8));this.vols.writeInt(16777216);this.vols.writeInt(225);b.readBytes(this.vols.view,8,e);b.position=32;i=b.readUnsignedInt();b.position=40;this.version==k?(this.samples.length=57,f=0):(this.samples.length=200,f=2);for(g=0;10>g;++g)if(e=b.readUnsignedShort()<<1,0<e)if(a=b.position,b.position=i,d=b.readString(4),"SSMP"==d){h=e;for(d=0;10>d;++d)if(b.readInt(),e=b.readUnsignedShort()<<1,0<e){c=this.mixer.createSample();c.length=e+2;c.loop=b.readUnsignedShort();c.repeat=b.readUnsignedShort()<<1;if(c.loop+c.repeat>c.length)c.repeat=c.length-c.loop;if(i+c.length>b.length)c.length=b.length-i;c.pointer=this.mixer.store(b,c.length,i+j);c.loopPtr=c.pointer+c.loop;this.samples[100+10*g+d]=c;j+=c.length;b.position+=6}else b.position+=10;i+=h+2;b.position=a+4}else{b.position=a;c=this.mixer.createSample();c.length=e+f;c.loop=b.readUnsignedShort();c.repeat=b.readUnsignedShort()<<1;if(c.loop+c.repeat>c.length)c.repeat=c.length-c.loop;if(i+c.length>b.length)c.length=b.length-i;c.pointer=this.mixer.store(b,c.length,i);c.loopPtr=c.pointer+c.loop;this.samples[g]=c;i+=c.length}else b.position+=4;if(this.version==k){f=0;h=47;for(g=10;57>g;++g){c=this.mixer.createSample();c.length=l[f++]<<1;c.loop=0;c.repeat=c.length;a=this.mixer.memory.length;c.pointer=a;c.loopPtr=a;this.samples[g]=c;e=a+c.length;for(d=a;d<e;++d)this.mixer.memory[d]=l[h++]}}else{b.position=36;i=b.readUnsignedInt();b.position=100;for(g=10;90>g;++g)if(e=b.readUnsignedByte()<<1,!(2>e)){c=this.mixer.createSample();c.length=e;c.loop=0;c.repeat=c.length;if(i+c.length>b.length)c.length=b.length-i;c.pointer=this.mixer.store(b,c.length,i);c.loopPtr=c.pointer;this.samples[g]=c;i+=c.length}}this.length*=13}},process:{value:function(){var b,g,d,e,f,a=this.voices[0];if(0==--this.tick){for(b=this.seqs.position;a;){g=a.channel;this.pats.position=a.pattern+a.patStep;f=this.pats.readUnsignedByte();if(64<=a.patStep||73==f){if(this.seqs.position==this.length)this.seqs.position=0,this.mixer.complete=1;a.patStep=0;a.pattern=this.seqs.readUnsignedByte()<<6;a.transpose=this.seqs.readByte();a.soundTranspose=this.seqs.readByte();this.pats.position=a.pattern;f=this.pats.readUnsignedByte()}d=this.pats.readUnsignedByte();this.frqs.position=0;this.vols.position=0;if(0!=f){a.note=f&127;a.pitch=0;a.portamento=0;a.enabled=g.enabled=0;f=8+((d&63)+a.soundTranspose<<6);if(f<this.vols.length)this.vols.position=f;a.volStep=0;a.volSpeed=a.volCtr=this.vols.readUnsignedByte();a.volSustain=0;a.frqPos=8+(this.vols.readUnsignedByte()<<6);a.frqStep=0;a.frqSustain=0;a.vibratoFlag=0;a.vibratoSpeed=this.vols.readUnsignedByte();a.vibratoDepth=a.vibrato=this.vols.readUnsignedByte();a.vibratoDelay=this.vols.readUnsignedByte();a.volPos=this.vols.position}if(d&64)a.portamento=0;else if(d&128)a.portamento=this.pats[this.pats.position+1],this.version==k&&(a.portamento<<=1);a.patStep+=2;a=a.next}if(this.seqs.position!=b&&(f=this.seqs.readUnsignedByte()))this.timer=f;this.tick=this.timer}for(a=this.voices[0];a;){g=a.channel;do{b=0;if(a.frqSustain){a.frqSustain--;break}this.frqs.position=a.frqPos+a.frqStep;do{e=0;if(0==this.frqs.bytesAvailable)break;d=this.frqs.readUnsignedByte();if(225==d)break;if(224==d)a.frqStep=this.frqs.readUnsignedByte()&63,this.frqs.position=a.frqPos+a.frqStep,d=this.frqs.readUnsignedByte();switch(d){case 226:g.enabled=0,a.enabled=1,a.volCtr=1,a.volStep=0;case 228:(d=this.samples[this.frqs.readUnsignedByte()])?(g.pointer=d.pointer,g.length=d.length):a.enabled=0;a.sample=d;a.frqStep+=2;break;case 233:f=100+10*this.frqs.readUnsignedByte();if(d=this.samples[f+this.frqs.readUnsignedByte()])g.enabled=0,g.pointer=d.pointer,g.length=d.length,a.enabled=1;a.sample=d;a.volCtr=1;a.volStep=0;a.frqStep+=3;break;case 231:e=1;a.frqPos=8+(this.frqs.readUnsignedByte()<<6);if(a.frqPos>=this.frqs.length)a.frqPos=0;a.frqStep=0;this.frqs.position=a.frqPos;break;case 234:a.pitchBendSpeed=this.frqs.readByte();a.pitchBendTime=this.frqs.readUnsignedByte();a.frqStep+=3;break;case 232:b=1;a.frqSustain=this.frqs.readUnsignedByte();a.frqStep+=2;break;case 227:a.vibratoSpeed=this.frqs.readUnsignedByte(),a.vibratoDepth=this.frqs.readUnsignedByte(),a.frqStep+=3}if(!b&&!e)this.frqs.position=a.frqPos+a.frqStep,a.frqTranspose=this.frqs.readByte(),a.frqStep++}while(e)}while(b);if(a.volSustain)a.volSustain--;else if(a.volBendTime)a.volumeBend();else if(0==--a.volCtr){a.volCtr=a.volSpeed;do{e=0;this.vols.position=a.volPos+a.volStep;if(0==this.vols.bytesAvailable)break;d=this.vols.readUnsignedByte();if(225==d)break;switch(d){case 234:a.volBendSpeed=this.vols.readByte();a.volBendTime=this.vols.readUnsignedByte();a.volStep+=3;a.volumeBend();break;case 232:a.volSustain=this.vols.readUnsignedByte();a.volStep+=2;break;case 224:e=1;f=this.vols.readUnsignedByte()&63;a.volStep=f-5;break;default:a.volume=d,a.volStep++}}while(e)}d=a.frqTranspose;0<=d&&(d+=a.note+a.transpose);d&=127;e=n[d];if(a.vibratoDelay)a.vibratoDelay--;else{f=a.vibrato;if(a.vibratoFlag){if(b=a.vibratoDepth<<1,f+=a.vibratoSpeed,f>b)f=b,a.vibratoFlag=0}else if(f-=a.vibratoSpeed,0>f)f=0,a.vibratoFlag=1;a.vibrato=f;f-=a.vibratoDepth;for(b=(d<<1)+160;256>b;)f<<=1,b+=24;e+=f}a.portamentoFlag^=1;if(a.portamentoFlag&&a.portamento)a.pitch=31<a.portamento?a.pitch+(a.portamento&31):a.pitch-a.portamento;a.pitchBendFlag^=1;a.pitchBendFlag&&a.pitchBendTime&&(a.pitchBendTime--,a.pitch-=a.pitchBendSpeed);e+=a.pitch;113>e?e=113:3424<e&&(e=3424);g.period=e;g.volume=a.volume;if(a.sample)d=a.sample,g.enabled=a.enabled,g.pointer=d.loopPtr,g.length=d.repeat;a=a.next}}}});
			h.voices[0]=j(0);
			h.voices[0].next=h.voices[1]=j(1);
			h.voices[1].next=h.voices[2]=j(2);
			h.voices[2].next=h.voices[3]=j(3);
			return Object.seal(h)
		}
		var k=1,m=2,n=[1712,1616,1524,1440,1356,1280,1208,1140,1076,1016,960,906,856,808,762,720,678,640,604,570,538,508,480,453,428,404,381,360,339,320,302,285,269,254,240,226,214,202,190,180,170,160,151,143,135,127,120,113,113,113,113,113,113,113,113,113,113,113,113,113,3424,3232,3048,2880,2712,2560,2416,2280,2152,2032,1920,1812,1712,1616,1524,1440,1356,1280,1208,1140,1076,1016,960,906,856,808,762,720,678,640,604,570,538,508,480,453,428,404,381,360,339,320,302,285,269,254,240,226,214,202,190,180,170,160,151,143,135,127,120,113,113,113,113,113,113,113,113,113,113,113,113,113],l=[16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,8,8,8,8,8,8,8,8,16,8,16,16,8,8,24,-64,-64,-48,-40,-32,-24,-16,-8,0,-8,-16,-24,-32,-40,-48,-56,63,55,47,39,31,23,15,7,-1,7,15,23,31,39,47,55,-64,-64,-48,-40,-32,-24,-16,-8,0,-8,-16,-24,-32,-40,-48,-56,-64,55,47,39,31,23,15,7,-1,7,15,23,31,39,47,55,-64,-64,-48,-40,-32,-24,-16,-8,0,-8,-16,-24,-32,-40,-48,-56,-64,-72,47,39,31,23,15,7,-1,7,15,23,31,39,47,55,-64,-64,-48,-40,-32,-24,-16,-8,0,-8,-16,-24,-32,-40,-48,-56,-64,-72,-80,39,31,23,15,7,-1,7,15,23,31,39,47,55,-64,-64,-48,-40,-32,-24,-16,-8,0,-8,-16,-24,-32,-40,-48,-56,-64,-72,-80,-88,31,23,15,7,-1,7,15,23,31,39,47,55,-64,-64,-48,-40,-32,-24,-16,-8,0,-8,-16,-24,-32,-40,-48,-56,-64,-72,-80,-88,-96,23,15,7,-1,7,15,23,31,39,47,55,-64,-64,-48,-40,-32,-24,-16,-8,0,-8,-16,-24,-32,-40,-48,-56,-64,-72,-80,-88,-96,-104,15,7,-1,7,15,23,31,39,47,55,-64,-64,-48,-40,-32,-24,-16,-8,0,-8,-16,-24,-32,-40,-48,-56,-64,-72,-80,-88,-96,-104,-112,7,-1,7,15,23,31,39,47,55,-64,-64,-48,-40,-32,-24,-16,-8,0,-8,-16,-24,-32,-40,-48,-56,-64,-72,-80,-88,-96,-104,-112,-120,-1,7,15,23,31,39,47,55,-64,-64,-48,-40,-32,-24,-16,-8,0,-8,-16,-24,-32,-40,-48,-56,-64,-72,-80,-88,-96,-104,-112,-120,-128,7,15,23,31,39,47,55,-64,-64,-48,-40,-32,-24,-16,-8,0,-8,-16,-24,-32,-40,-48,-56,-64,-72,-80,-88,-96,-104,-112,-120,-128,-120,15,23,31,39,47,55,-64,-64,-48,-40,-32,-24,-16,-8,0,-8,-16,-24,-32,-40,-48,-56,-64,-72,-80,-88,-96,-104,-112,-120,-128,-120,-112,23,31,39,47,55,-64,-64,-48,-40,-32,-24,-16,-8,0,-8,-16,-24,-32,-40,-48,-56,-64,-72,-80,-88,-96,-104,-112,-120,-128,-120,-112,-104,31,39,47,55,-64,-64,-48,-40,-32,-24,-16,-8,0,-8,-16,-24,-32,-40,-48,-56,-64,-72,-80,-88,-96,-104,-112,-120,-128,-120,-112,-104,-96,39,47,55,-64,-64,-48,-40,-32,-24,-16,-8,0,-8,-16,-24,-32,-40,-48,-56,-64,-72,-80,-88,-96,-104,-112,-120,-128,-120,-112,-104,-96,-88,47,55,-64,-64,-48,-40,-32,-24,-16,-8,0,-8,-16,-24,-32,-40,-48,-56,-64,-72,-80,-88,-96,-104,-112,-120,-128,-120,-112,-104,-96,-88,-80,55,-127,-127,-127,-127,-127,-127,-127,-127,-127,-127,-127,-127,-127,-127,-127,-127,127,127,127,127,127,127,127,127,127,127,127,127,127,127,127,127,-127,-127,-127,-127,-127,-127,-127,-127,-127,-127,-127,-127,-127,-127,-127,-127,-127,127,127,127,127,127,127,127,127,127,127,127,127,127,127,127,-127,-127,-127,-127,-127,-127,-127,-127,-127,-127,-127,-127,-127,-127,-127,-127,-127,-127,127,127,127,127,127,127,127,127,127,127,127,127,127,127,-127,-127,-127,-127,-127,-127,-127,-127,-127,-127,-127,-127,-127,-127,-127,-127,-127,-127,-127,127,127,127,127,127,127,127,127,127,127,127,127,127,-127,-127,-127,-127,-127,-127,-127,-127,-127,-127,-127,-127,-127,-127,-127,-127,-127,-127,-127,-127,127,127,127,127,127,127,127,127,127,127,127,127,-127,-127,-127,-127,-127,-127,-127,-127,-127,-127,-127,-127,-127,-127,-127,-127,-127,-127,-127,-127,-127,127,127,127,127,127,127,127,127,127,127,127,-127,-127,-127,-127,-127,-127,-127,-127,-127,-127,-127,-127,-127,-127,-127,-127,-127,-127,-127,-127,-127,-127,127,127,127,127,127,127,127,127,127,127,-127,-127,-127,-127,-127,-127,-127,-127,-127,-127,-127,-127,-127,-127,-127,-127,-127,-127,-127,-127,-127,-127,-127,127,127,127,127,127,127,127,127,127,-127,-127,-127,-127,-127,-127,-127,-127,-127,-127,-127,-127,-127,-127,-127,-127,-127,-127,-127,-127,-127,-127,-127,-127,127,127,127,127,127,127,127,127,-127,-127,-127,-127,-127,-127,-127,-127,-127,-127,-127,-127,-127,-127,-127,-127,-127,-127,-127,-127,-127,-127,-127,-127,-127,127,127,127,127,127,127,127,-127,-127,-127,-127,-127,-127,-127,-127,-127,-127,-127,-127,-127,-127,-127,-127,-127,-127,-127,-127,-127,-127,-127,-127,-127,-127,127,127,127,127,127,127,-127,-127,-127,-127,-127,-127,-127,-127,-127,-127,-127,-127,-127,-127,-127,-127,-127,-127,-127,-127,-127,-127,-127,-127,-127,-127,-127,127,127,127,127,127,-127,-127,-127,-127,-127,-127,-127,-127,-127,-127,-127,-127,-127,-127,-127,-127,-127,-127,-127,-127,-127,-127,-127,-127,-127,-127,-127,-127,127,127,127,127,-127,-127,-127,-127,-127,-127,-127,-127,-127,-127,-127,-127,-127,-127,-127,-127,-127,-127,-127,-127,-127,-127,-127,-127,-127,-127,-127,-127,-127,127,127,127,-128,-128,-128,-128,-128,-128,-128,-128,-128,-128,-128,-128,-128,-128,-128,-128,-128,-128,-128,-128,-128,-128,-128,-128,-128,-128,-128,-128,-128,-128,127,127,-128,-128,-128,-128,-128,-128,-128,-128,-128,-128,-128,-128,-128,-128,-128,-128,-128,-128,-128,-128,-128,-128,-128,-128,-128,-128,-128,-128,-128,-128,-128,127,-128,-128,-128,-128,-128,-128,-128,-128,127,127,127,127,127,127,127,127,-128,-128,-128,-128,-128,-128,-128,127,127,127,127,127,127,127,127,127,-128,-128,-128,-128,-128,-128,127,127,127,127,127,127,127,127,127,127,-128,-128,-128,-128,-128,127,127,127,127,127,127,127,127,127,127,127,-128,-128,-128,-128,127,127,127,127,127,127,127,127,127,127,127,127,-128,-128,-128,127,127,127,127,127,127,127,127,127,127,127,127,127,-128,-128,127,127,127,127,127,127,127,127,127,127,127,127,127,127,-128,-128,127,127,127,127,127,127,127,127,127,127,127,127,127,127,-128,-128,-112,-104,-96,-88,-80,-72,-64,-56,-48,-40,-32,-24,-16,-8,0,8,16,24,32,40,48,56,64,72,80,88,96,104,112,127,-128,-128,-96,-80,-64,-48,-32,-16,0,16,32,48,64,80,96,112,69,69,121,125,122,119,112,102,97,88,83,77,44,32,24,18,4,-37,-45,-51,-58,-68,-75,-82,-88,-93,-99,-103,-109,-114,-117,-118,69,69,121,125,122,119,112,102,91,75,67,55,44,32,24,18,4,-8,-24,-37,-49,-58,-66,-80,-88,-92,-98,-102,-107,-108,-115,-125,0,0,64,96,127,96,64,32,0,-32,-64,-96,-128,-96,-64,-32,0,0,64,96,127,96,64,32,0,-32,-64,-96,-128,-96,-64,-32,-128,-128,-112,-104,-96,-88,-80,-72,-64,-56,-48,-40,-32,-24,-16,-8,0,8,16,24,32,40,48,56,64,72,80,88,96,104,112,127,-128,-128,-96,-80,-64,-48,-32,-16,0,16,32,48,64,80,96,112]
	})();
	
})();
