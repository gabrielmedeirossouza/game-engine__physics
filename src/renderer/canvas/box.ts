import { Vector2 } from "@/math";
import { Drawer } from "./drawer";

export class Box extends Drawer {
	constructor(vertices: Vector2[], color: string) {
		super();

		for (const vertex of vertices) {
			Drawer._ctx.beginPath();
			Drawer._ctx.arc(vertex.x, vertex.y * -1, 5, 0, 2 * Math.PI);
			Drawer._ctx.strokeStyle = color;
			Drawer._ctx.fillStyle = color;
			Drawer._ctx.fill();
			Drawer._ctx.stroke();
			Drawer._ctx.closePath();
		}
	}
}
