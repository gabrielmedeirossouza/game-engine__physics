import { Vector2 } from "./math";
import { Canvas } from "./renderer";
import { Particle, Force } from "./physics";
import { GameBehavior } from "./game";
import { GRAVITY, PIXELS_PER_METER } from "./constants";

class Game extends GameBehavior {
	protected _particle = new Particle();

	constructor() {
		super();

		this._particle.mass = 1;
	}

	public BeforeUpdate(): void {
		Canvas.Clear();
	}

	public Update(): void {
		this._particle.AddForce(
			Vector2.MultiplyScalar(
				Vector2.MultiplyScalar(GRAVITY, PIXELS_PER_METER),
				this._particle.mass
			)
		);

		if (this._particle.position.y < -200) {
			const dragForce = Force.GenerateDragForce(this._particle, 0.04);

			this._particle.AddForce(dragForce);
		}

		this._particle.Integrate(this.deltaTime);

		Canvas.Circle(
			this._particle.position,
			5
		);
	}
}

const game = new Game();
game.Start();
