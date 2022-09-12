export class Drawer {
	public static scalar = 50;

	protected static _ctx: CanvasRenderingContext2D;

	protected static _canvas: HTMLCanvasElement;

	static {
		this._canvas = document.querySelector('canvas')!;

		if (!this._canvas) {
			throw new Error('No canvas element found');
		}

		this._canvas.width = window.innerWidth;
		this._canvas.height = window.innerHeight;
		this._ctx = this._canvas.getContext('2d', { willReadFrequently: true })!;
		this._ctx.imageSmoothingQuality = "high";
		this._ctx.translate(this._canvas.width / 2, this._canvas.height / 2);

		window.addEventListener('resize', () => {
			this._canvas.width = window.innerWidth;
			this._canvas.height = window.innerHeight;
			this._ctx.translate(this._canvas.width / 2, this._canvas.height / 2);
		});
	}
}
