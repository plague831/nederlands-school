/** Рядок, що біжить під hero. Дублюється двічі для безшовного зациклення. */
const TICKER_TEXT = 'NEDERLANDS · НІДЕРЛАНДСЬКА · SPREEK! · NEDERLAND · '.repeat(4);

export function Ticker() {
  return (
    <div className="ticker">
      <div className="ticker-track">
        {[0, 1].map((copy) => (
          // Друга копія — суто візуальна, тож ховаємо її від читалок.
          <span key={copy} aria-hidden={copy === 1}>
            {TICKER_TEXT}
          </span>
        ))}
      </div>
    </div>
  );
}
