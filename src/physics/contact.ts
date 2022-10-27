import { Vector2 } from "@/math";
import { Body } from "./body";

export class Contact {
	public start = Vector2.zero;

	public end = Vector2.zero;

	public normal = Vector2.zero;

	public depth = 0;

	public bodyA: Body;

	public bodyB: Body;

	public ResolveCollision(): void {
		/**
		 * The total inverse mass of the two bodies
		 *
		 * da = depth * mb / (ma + mb)
		 *
		 * db = depth * ma / (ma + mb)
		 *
		 * Notation:
		 * - ma: mass of body A
		 * - mb: mass of body B
		 * - da: depth of body A
		 * - db: depth of body B
		 * - depth: total depth of the two bodies
		 *
		 */

		const da = this.depth * this.bodyB.mass / (this.bodyA.mass + this.bodyB.mass);
		const db = this.depth * this.bodyA.mass / (this.bodyA.mass + this.bodyB.mass);

		this.bodyA.position = Vector2.Subtract(this.bodyA.position, Vector2.MultiplyScalar(this.normal, da));
		this.bodyB.position = Vector2.Add(this.bodyB.position, Vector2.MultiplyScalar(this.normal, db));
	}
}
