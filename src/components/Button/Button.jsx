
export function Button({onClick}) {
    

    return (
      <button onClick={()=>onClick()} className="button" type="button">
        Load more
      </button>
    );
}