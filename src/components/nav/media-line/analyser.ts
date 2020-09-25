export class MediaAnalyser {
    private audioCtx: AudioContext;
    private analyser: AnalyserNode;
    private source: MediaElementAudioSourceNode;
    private byteFrequencyData: Uint8Array;
    private byteTimeDomainData: Uint8Array;
    private analyserReady: boolean = false;

    bufferLength: number;

    constructor(private AudioElement: HTMLAudioElement) {
        this.audioCtx = new (window.AudioContext)();
        this.analyser = this.audioCtx.createAnalyser();
        this.analyser.fftSize = 512;
        this.bufferLength = this.analyser.frequencyBinCount;

        this.source = this.audioCtx.createMediaElementSource(this.AudioElement);
        this.source.connect(this.analyser);
        this.analyser.connect(this.audioCtx.destination);
        this.source.connect(this.audioCtx.destination);

        this.byteFrequencyData = new Uint8Array(this.analyser.frequencyBinCount);
        this.byteTimeDomainData = new Uint8Array(this.analyser.frequencyBinCount);

        this.analyserReady = true;
    }

    getByteFrequencyData() {
        if (this.analyser !== null && this.analyserReady) {
            this.analyser.getByteFrequencyData(this.byteFrequencyData)
            return this.byteFrequencyData
        }
        else {
            return new Uint8Array(0)
        }
    }

    getByteTimeDomainData() {
        if (this.analyser !== null && this.analyserReady) {
            this.analyser.getByteTimeDomainData(this.byteTimeDomainData)
            return this.byteTimeDomainData
        }
        else {
            return new Uint8Array(0)
        }
    }

    setComplexity(complexity: number) {
        this.analyser.fftSize = Math.pow(2, complexity+1)
        this.byteFrequencyData = new Uint8Array(this.analyser.frequencyBinCount)
        this.byteTimeDomainData = new Uint8Array(this.analyser.frequencyBinCount)
        this.bufferLength = this.analyser.frequencyBinCount
    }
}