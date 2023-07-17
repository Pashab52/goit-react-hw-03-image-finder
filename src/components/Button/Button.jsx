
export function Button({onClick}) {
    

    return (
      <div className="wrap">
        <button onClick={() => onClick()} className="button-load" type="button">
          Load more
        </button>
      </div>
            );
}