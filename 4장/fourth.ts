/* 4장 narrowing 주요 소스 코드 */

// Type Assertions
const myCanvas = document.getElemetById("main_canvas") as HTMLCanvasElemet;

// typeof로 Type Guards
function padLeft(padding: number | string, input: string ) : string {
    // typeof 없이 return을 하면 padding이 number일 가능성을 TS가 체크하여, ERROR
    if (typeof padding === "number") {
        return new Array(padding + 1).join(" ") + input;
    }
    return padding + input;
}


// Truthiness Narrowing
function padLeft(padding: number | string | null, input: string) : string {
    if (padding !== null) {
        if (typeof padding === 'number') {
            return new Array(padding + 1).join(' ') + input;
        }
        return padding + input;
    }
    return input;
}


// Equality Narrowing
function func1 (x: string | number, y: string | boolean) {
    if (x === y) {
        x.toUpperCase();
        y.toUpperCase();
    } else {
        console.log(x, y);
    }
}


// instanceof Narrowing
function logVal(x: Date | string) {
	if (x instanceof Date) {
		// x의 parameter : Date
		console.log(x.toUTCString());
	}
	else {
		// x의 parameter : string
		console.log(x.toUpperCate());
	}
}


// Discriminated Unions

interface Circle {
		kind: 'circle';
    radius: number;
}

interface Square {
    kind: 'square';
    sideLength: number;
}

type Shape = Circle | Square;

function getArea (shape: Shape){
    switch(shape.kind) {
        case 'circle':
            return Math.PI * shape.radius ** 2;
        case 'square' : 
            return shape.sideLength ** 2;
    }
 }

