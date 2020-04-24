
export declare const rawSymbol : unique symbol;

type RawComponent = { [rawSymbol] : unknown };
type UriComponent = string | number | RawComponent;

export declare const raw : <T>(value : T) => RawComponent;

declare const uri : {
    (stringParts : TemplateStringsArray, ...substitutions : UriComponent[]) : string,
    raw : typeof raw,
};

export default uri;
