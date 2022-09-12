// import { Vector2 } from "./math";
import { Canvas } from "./renderer";
import { Particle, Force } from "./physics";
import { GameBehavior } from "./game";
import { PIXELS_PER_METER } from "./constants";

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
		const friction = Force.GenerateFrictionForce(this._particle, 3 * PIXELS_PER_METER);
		this._particle.AddForce(friction);

		this._particle.Integrate(this._deltaTime);
	}

	public AfterUpdate(): void {
		Canvas.Circle(
			this._particle.position,
			5
		);
	}
}

const game = new Game();
game.Start();
