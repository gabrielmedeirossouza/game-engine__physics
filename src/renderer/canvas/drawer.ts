export class Drawer {
	public static scalar = 50;

	protected static canvas: HTMLCanvasElement;

	protected static ctx: CanvasRenderingContext2D;

	static {
		this.canvas = document.querySelector('canvas')!;

		if (!this.canvas) {
			throw new Error('No canvas element found');
		}

		this.canvas.width = window.innerWidth;
		this.canvas.height = window.innerHeight;
		this.ctx = this.canvas.getContext('2d', { willReadFrequently: true })!;
		this.ctx.imageSmoothingQuality = "high";
		this.ctx.translate(this.canvas.width / 2, this.canvas.height / 2);

		window.addEventListener('resize', () => {
			this.canvas.width = window.innerWidth;
			this.canvas.height = window.innerHeight;
			this.ctx.translate(this.canvas.width / 2, this.canvas.height / 2);
		});
	}
}
