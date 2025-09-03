import {DIV} from '../../../global.d.ts'
export interface MCONSOLE {
	init: () => DIV;
	green: (data:any[]) => void;
	red: (data: any[]) => void;
	blue: (data: any[]) => void;
	yellow: (data: any[]) => void;
	test: (condition: any, data: any[]) => void;
	time: (label: string) => void;
	timeEnd: (label: string) => void;
}
