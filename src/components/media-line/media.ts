export class MediaHandler {
    private audioCtx: AudioContext;
    private analyser: AnalyserNode;
    private source: MediaElementAudioSourceNode;
    private byteFrequencyData: Uint8Array;
    private playing: boolean = false;
    private analyserReady: boolean = false;

    constructor(private AudioElement: HTMLAudioElement) {
        this.audioCtx = new (window.AudioContext)();
        this.analyser = this.audioCtx.createAnalyser();
        this.analyser.fftSize = 512;

        this.source = this.audioCtx.createMediaElementSource(this.AudioElement);
        this.source.connect(this.analyser);
        this.analyser.connect(this.audioCtx.destination);
        this.source.connect(this.audioCtx.destination);

        this.byteFrequencyData = new Uint8Array(this.analyser.frequencyBinCount);

        this.analyserReady = true;
    }

    playpause() {
        if (!this.playing) {
            this.AudioElement.play()
            this.playing = true
        }
        else {
            this.AudioElement.pause()
            this.playing = false
        }
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
}