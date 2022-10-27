import { Vector2 } from "@/math";
import { Shape } from './shape';
import { BoxShape } from './box-shape';

export class Body<TShape extends Shape = Shape> {
	public mass: number;

	protected _shape: TShape;

	protected _position: Vector2;

	protected _velocity = new Vector2(0, 0);

	protected _acceleration = new Vector2(0, 0);

	private _sumOfForces = Vector2.zero;

	protected _rotation: number;

	protected _angularVelocity = 0;

	protected _angularAcceleration = 0;

	protected _momentOfInertia: number;

	private _sumOfTorques = 0;

	constructor(shape: TShape, position = Vector2.zero, rotation = 0, mass = 1) {
		this._rotation = rotation;
		this._shape = shape;
		this._position = position;
		this.mass = mass;
		this._momentOfInertia = this._shape.GetMomentOfInertia(this.mass);
	}

	public get shape(): TShape {
		return this._shape;
	}

	public get position(): Vector2 {
		return this._position;
	}

	public set position(position: Vector2) {
		this._position = position;
	}

	public get velocity(): Vector2 {
		return this._velocity;
	}

	public get acceleration(): Vector2 {
		return this._acceleration;
	}

	public get rotation(): number {
		return this._rotation;
	}

	public AddForce(force: Vector2): void {
		this._sumOfForces.Add(force);
	}

	public AddTorque(torque: number): void {
		this._sumOfTorques += torque;
	}

	public IntegrateLinear(dt: number): void {
		// Find the acceleration from the sum of forces and mass | a = F / m
		this._acceleration = this._sumOfForces.DivideScalar(this.mass);

		// Euler Method - Integrate the acceleration to find new velocity in the next frame | v = v0 + a * dt
		this._velocity.Add(Vector2.MultiplyScalar(this._acceleration, dt));

		// Euler Method - Integrate the velocity to find new position in the next frame | p = p0 + v * dt
		this._position.Add(Vector2.MultiplyScalar(this._velocity, dt));

		// Clear all forces for the next frame
		this._ClearForces();
	}

	public IntegrateAngular(dt: number): void {
		// Find the angular acceleration from the sum of torques and moment of inertia | alpha = T / I
		this._angularAcceleration = this._sumOfTorques / this._momentOfInertia;

		// Euler Method - Integrate the angular acceleration to find new angular velocity in the next frame | omega = omega0 + alpha * dt
		this._angularVelocity += this._angularAcceleration * dt;

		// Euler Method - Integrate the angular velocity to find new rotation in the next frame | theta = theta0 + omega * dt
		this._rotation += this._angularVelocity * dt;

		// Clear all torques for the next frame
		this._ClearTorques();
	}

	public Update(dt: number): void {
		this.IntegrateLinear(dt);
		this.IntegrateAngular(dt);

		if (this._shape instanceof BoxShape) {
			this._shape.UpdateVertices(this._position, this._rotation) ;
		}
	}

	private _ClearForces(): void {
		this._sumOfForces = Vector2.zero;
	}

	private _ClearTorques(): void {
		this._sumOfTorques = 0;
	}
}
