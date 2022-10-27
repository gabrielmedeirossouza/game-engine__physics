
import { Vector2 } from "./math";
import { Canvas } from "./renderer";
import { Body, BoxShape, CircleShape, Force, CollisionDetection } from "./physics";
import { GameBehavior } from "./game";
import { EShapeType } from "./physics/shape";
import { Contact } from "./physics/contact";
import { PIXELS_PER_METER } from "./constants";

class Game extends GameBehavior {
	public bodies: Body[] = [];

	public anchor = Vector2.zero;

	public rotation = 0;

	constructor() {
		super();

		const smallBall = new Body(new CircleShape(10), new Vector2(100, 100), 0, 1);
		const bigBall = new Body(new CircleShape(50), new Vector2(200, 100), 0, 3);
		// const box = new Body(new BoxShape(100, 100), new Vector2(100, 100), 0, 3);

		// bigBall.shape.

		this.bodies.push(smallBall, bigBall);

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
		this.bodies[0].AddTorque(this.rotation);

		const dragForce = Force.GenerateDragForce(this.bodies[0], 0.001);
		this.bodies[0].AddForce(dragForce);

		const frictionForce = Force.GenerateFrictionForce(this.bodies[0], 5 * PIXELS_PER_METER);
		this.bodies[0].AddForce(frictionForce);

		const springForce = Force.GenerateSpringForce(this.bodies[0], this.anchor, 0, 50);
		this.bodies[0].AddForce(springForce);
	}

	public AfterUpdate(): void {
		this.bodies.forEach((body) => {
			body.Update(this._deltaTime);
		});
	}

	public RendererUpdate(): void {
		for (let i = 0; i < this.bodies.length - 1; i++) {
			for (let j = i + 1; j < this.bodies.length; j++) {
				const bodyA = this.bodies[i];
				const bodyB = this.bodies[j];

				const contact = new Contact();
				// collision detection
				if (CollisionDetection.IsColliding(bodyA, bodyB, contact)) {
					// CollisionResolution
					contact.ResolveCollision();
				}

				console.log(contact);
			}
		}

		const test: { [key in EShapeType]: (body: any) => void } = {
			0: (body: Body<CircleShape>) => {
				Canvas.Circle(body.position, body.shape.radius);
			},
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			1: (body: Body<any>) => {},
			2: (body: Body<BoxShape>) => {
				Canvas.Box(body.shape.getWorldVertices);
			},
		};

		this.bodies.forEach((body) => {
			test[body.shape.getType]?.(body);
		});
	}
}

const game = new Game();
game.Start();
