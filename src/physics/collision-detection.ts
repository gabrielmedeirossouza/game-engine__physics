import { Body } from './body';
import { CircleShape } from "./circle-shape";
import { Vector2 } from '@/math';
import { Contact } from './contact';

export class CollisionDetection {
	public static IsColliding(bodyA: Body, bodyB: Body, contact: Contact): boolean {
		const isBodyACircle = bodyA.shape instanceof CircleShape;
		const isBodyBCircle = bodyB.shape instanceof CircleShape;

		if (isBodyACircle && isBodyBCircle) {
			const isColliding = CollisionDetection._IsCollidingCircleCircle(
				bodyA as Body<CircleShape>,
				bodyB as Body<CircleShape>,
				contact
			);

			return isColliding;
		}

		return false;
	}

	private static _IsCollidingCircleCircle(bodyA: Body<CircleShape>, bodyB: Body<CircleShape>, contact: Contact): boolean {
		const distance = Vector2.Subtract(bodyB.position, bodyA.position);
		const radiusSum = bodyA.shape.radius + bodyB.shape.radius;

		const isColliding = distance.magnitudeSquared < radiusSum * radiusSum;

		if (!isColliding) {
			return false;
		}

		contact.bodyA = bodyA;
		contact.bodyB = bodyB;

		contact.normal = distance.normalized;

		contact.start = Vector2.Subtract(bodyB.position, Vector2.MultiplyScalar(contact.normal, bodyB.shape.radius));
		contact.end = Vector2.Add(bodyA.position, Vector2.MultiplyScalar(contact.normal, bodyA.shape.radius));

		// contact.depth = magnitude of (contact.start - contact.end) or (radiusSum - magnitude of distance)
		contact.depth = radiusSum - distance.magnitude;

		return true;
	}
}
