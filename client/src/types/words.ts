export default interface Word {
    id          : number;
    word        : string;
    answere     : string;
    options     : string[];
    attempted   : boolean;
    result      : boolean; 
}