import { Vector2 } from "./math";
import { Canvas } from "./renderer";
import { Particle, Force } from "./physics";
import { GameBehavior } from "./game";

class Game extends GameBehavior {
	 public particleA = new Particle(new Vector2(0, 0));

	 public anchor = Vector2.zero;

	constructor() {
		super();

		this.particleA.mass = 1;

		window.addEventListener('click', (event) => {
			const halfWidth = window.innerWidth / 2;
			const halfHeight = window.innerHeight / 2;
			this.anchor = new Vector2(event.pageX - halfWidth, (event.pageY - halfHeight) * -1);
		});
	}

	public BeforeUpdate(): void {
		Canvas.Clear();
	}

	public Update(): void {
		const dragForce = Force.GenerateDragForce(this.particleA, 0.001);
		this.particleA.AddForce(dragForce);

		const frictionForce = Force.GenerateFrictionForce(this.particleA, 100);
		this.particleA.AddForce(frictionForce);

		const springForce = Force.GenerateSpringForce(this.particleA, this.anchor, 0, 50);
		this.particleA.AddForce(springForce);

		this.particleA.Integrate(this._deltaTime);
	}

	public AfterUpdate(): void {
		Canvas.Circle(
			this.particleA.position,
			5
		);
	}
}

const game = new Game();
game.Start();
