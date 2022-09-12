import { Vector2 } from '@/math';
import { Body } from './body';

// TODO: Implement GenerateComplexDragForce and GenerateComplexFrictionForce to more precision and less performance

export class Force {
	public static GenerateImpulseForce(direction: Vector2, k: number): Vector2 {
		/**
     * F = dp/dt
     *
     * As the time of each frame changes, let's fix a force. So:
     *
     * F = k * p
     *
     * Notation:
     *  - F: Final force
     *  - k: Random impulse force
     *  - p: Position where the force will be applied
     */

		const impulseDirection = direction.normalized;

		const impulseForce = k;

		const impulse = Vector2.MultiplyScalar(impulseDirection, impulseForce);

		return impulse;
	}

	public static GenerateDragForce(body: Body, k: number): Vector2 {
		/**
     * F = 1/2 * p * K * A * ||v||² * -v
     *
     * The (1/2 * p * K * A) can be replaced with a constant, to simplify the calculation of the force. E.g. k.
     *
     * F = C * ||v||² * -v
     *
     * Notation:
     *  - F: Force
     *  - p: density of the fluid
     *  - K: drag coefficient
     *  - A: cross-sectional area of the body
     *  - k: constant to: 1/2 * p * K * A
     *  - v: direction of velocity of the body (normalized)
    */
		let dragForce = Vector2.zero;

		if (body.velocity.magnitudeSquared > 0) {
			const dragDirection = body.velocity.normalized.MultiplyScalar(-1);

			const dragMagnitude = k * body.velocity.magnitudeSquared;

			dragForce = Vector2.MultiplyScalar(dragDirection, dragMagnitude);
		}

		return dragForce;
	}

	public static GenerateFrictionForce(body: Body, k: number): Vector2 {
		/**
     * Ff = u * ||Fn|| * -v
     *
     * The (u * ||Fn||) can be replaced with a constant, to simplify the calculation of the force. E.g. k.
     *
     * Ff = k * -v
     *
     * Notation:
     *  - Ff: Friction force
     *  - u: Coefficient of friction
     *  - Fn: Normal force
     *  - k: constant to: u * ||Fn||
     *  - direction of velocity of the body (normalized)
     */

		const frictionDirection = Vector2.MultiplyScalar(body.velocity.normalized, -1);

		const frictionMagnitude = k;

		const frictionForce = Vector2.MultiplyScalar(frictionDirection, frictionMagnitude);

		return frictionForce;
	}
}
