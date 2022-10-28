
import { Vector2 } from "./math";
import { Canvas } from "./renderer";
import { Body, BoxShape, CircleShape, Force, CollisionDetection } from "./physics";
import { GameBehavior } from "./game";
import { EShapeType } from "./physics/shape";
import { Contact } from "./physics/contact";
import { PIXELS_PER_METER } from "./constants";

class Game extends GameBehavior {
	public bodies: Body[] = [];

	public bodiesWithGravity: Body[] = [];

	public anchor = Vector2.zero;

	public rotation = 0;

	constructor() {
		super();

		const smallBall = new Body(new CircleShape(10), new Vector2(100, 100), 0);
		const bigBall = new Body(new CircleShape(50), new Vector2(200, 100), 0, 0);
		const bigBall2 = new Body(new CircleShape(50), new Vector2(290, 100), 0, 0);
		const bigBall3 = new Body(new CircleShape(50), new Vector2(380, 100), 0, 30);

		// console.log(bigBall.isStatic);
		// const box = new Body(new BoxShape(100, 100), new Vector2(100, 100), 0, 3);

		// bigBall.shape.

		this.bodies.push(smallBall, bigBall, bigBall2, bigBall3);

		window.addEventListener('mousemove', (event) => {
			const halfWidth = window.innerWidth / 2;
			const halfHeight = window.innerHeight / 2;

			const newBall = new Body(
				new CircleShape(5),
				new Vector2(event.pageX - halfWidth, (event.pageY - halfHeight) * -1),
				0,
				1,
				0.5
			);

			this.bodiesWithGravity.push(newBall);
			this.bodies.push(newBall);
		});

		for (let i = 0; i < 0; i++) {
			const newBall = new Body(
				new CircleShape(5),
				new Vector2(Math.random() * 500, Math.random() * 150 + 500),
				0,
				10
			);

			this.bodiesWithGravity.push(newBall);
			this.bodies.push(newBall);
		}
	}

	public BeforeUpdate(): void {
		Canvas.Clear();
	}

	public Update(): void {
		this.bodiesWithGravity.forEach((body) => {
			const weight = Vector2.MultiplyScalar(Vector2.down, body.mass * 9.81 * PIXELS_PER_METER);
			body.AddForce(weight);
		});

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

		const newBodies = this.bodies.filter((body) => {
			if (body.position.y > -1500) {
				return true;
			}

			return false;
		});

		const newBodiesWithGravity = this.bodiesWithGravity.filter((body) => {
			if (body.position.y > -1500) {
				return true;
			}

			return false;
		});

		this.bodies = newBodies;
		this.bodiesWithGravity = newBodiesWithGravity;
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
