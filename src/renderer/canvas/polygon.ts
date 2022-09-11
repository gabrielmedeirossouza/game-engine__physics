import { Vector2 } from "@/math";
import { Drawer } from "./drawer";

export class Polygon extends Drawer {
	constructor(origin: Vector2, vertices: Vector2[], color: string) {
		super();

		Drawer.ctx.beginPath();
		Drawer.ctx.strokeStyle = color;
		Drawer.ctx.fillStyle = color;
		Drawer.ctx.lineWidth = 2;
		Drawer.ctx.moveTo(origin.x, origin.y * -1);

		for (let index = 0; index <= vertices.length; index++) {
			const vertex = vertices[index] ?? vertices[0];

			Drawer.ctx.lineTo(vertex.x + origin.x, (vertex.y + origin.y) * -1);
		}

		Drawer.ctx.stroke();
		Drawer.ctx.closePath();
	}
}
