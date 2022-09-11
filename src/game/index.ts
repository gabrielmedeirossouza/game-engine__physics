export abstract class GameBehavior {
	protected deltaTime = 0;

	private _oldTime = 0;

	public Start(): void {
		this.BeforeUpdate?.();
		this._Update(0);
		this.AfterUpdate?.();
	};

	public BeforeUpdate?(): void;

	public Update?(): void;

	public AfterUpdate?(): void;

	private _Update(currentTime: number): void {
		this.deltaTime = currentTime - this._oldTime;
		this._oldTime = currentTime;

		this.BeforeUpdate?.();
		this.Update?.();
		this.AfterUpdate?.();

		requestAnimationFrame((event) => this._Update(event / 1000));
	}
}
