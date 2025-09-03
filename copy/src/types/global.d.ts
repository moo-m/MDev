export type DIV = HTMLDivElement;
export type ELE = HTMLDivElement;

declare global {
	interface Window {
		green: (...data: any[]) => void;
		red: (...data: any[]) => void;
		blue: (...data: any[]) => void;
		yellow: (...data: any[]) => void;
		test: (condition: any, ...data: any[]) => void;
		time: (lable?: string) => void;
		timeEnd: (lable?: string) => void;
	}

	interface Object {
		prototype: {
			green: () => void;
			red: () => void;
			blue: () => void;
			yellow: () => void;
			test: () => void;
			time: () => void;
			timeEnd: () => void;
		};
	}
}
