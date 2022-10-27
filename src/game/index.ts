const FIXED_FRAME_RATE = 50;
const FIXED_UPDATE = 1 / FIXED_FRAME_RATE;

export abstract class GameBehavior {
	protected _deltaTime = 0;

	private _oldTime = 0;

	public Start(): void {
		this.BeforeUpdate?.();
		this._Update(0);
		this.AfterUpdate?.();
	};

	public BeforeUpdate?(): void;

	public Update?(): void;

	public AfterUpdate?(): void;

	public RendererUpdate?(): void;

	private _Update(currentTime: number): void {
		const deltaTime = currentTime - this._oldTime;
		this._deltaTime = deltaTime <= FIXED_UPDATE ? deltaTime : FIXED_UPDATE;
		this._oldTime = currentTime;

		this.BeforeUpdate?.();
		this.Update?.();
		this.AfterUpdate?.();
		this.RendererUpdate?.();

		requestAnimationFrame((event) => this._Update(event / 1000));
	}
}
