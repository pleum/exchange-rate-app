import React, { useState, useEffect } from 'react';
import axios from 'axios';

const exchangeRatesAPI = 'https://api.exchangeratesapi.io/latest?base=';

function App() {
  const [currencyBase] = useState('THB');
  const [rateBase, setRateBase] = useState(1);
  const [data, setData] = useState({});
  const [isFinish, setFinish] = useState(false);

  const fetchCurrency = async () => {
    try {
      const response = await axios.get(exchangeRatesAPI + currencyBase);
      if (response.status === 200) {
        setData(response.data);
        setFinish(true);
      }
    } catch (e) {}
  };

  useEffect(() => {
    fetchCurrency();
  }, [currencyBase]);

  const handleRateChange = e => {
    setRateBase(e.target.value);
  };

  return (
    <div>
      <header class="tc">
        <h1 class="mb0">อัตราแลกเปลี่ยน</h1>
        <p class="inline">
          สร้างด้วย{' '}
          <a
            class="dark-blue link dim"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            React.js
          </a>
          ,{' '}
          <a
            class="dark-blue link dim"
            href="https://tachyons.io"
            target="_blank"
            rel="noopener noreferrer"
          >
            tachyons.css
          </a>
          {' และ '}
          <a
            class="dark-blue link dim"
            href="https://exchangeratesapi.io"
            target="_blank"
            rel="noopener noreferrer"
          >
            exchangeratesapi
          </a>
        </p>
      </header>
      <section class="ph3 mb4">
        <form class="mw6 center mb2">
          <input type="text" onChange={handleRateChange} value={rateBase} /> THB
        </form>
        <article class="mw6 center">
          <div class="flex flex-column">
            {isFinish ? (
              <div>
                <div class="mb2">
                  {Object.keys(data.rates)
                    .filter(currcency => currcency !== currencyBase)
                    .map(currcency => (
                      <article
                        class="dt pa2 bb b--black-05 w-100"
                        key={currcency}
                      >
                        <div class="dtc v-mid">
                          <h1 class="f6 f5-ns lh-title black mv0">
                            {currcency}
                          </h1>
                          <h2 class="f6 fw4 mt0 mb0 black-60">
                            {data.rates[currcency]}
                          </h2>
                        </div>
                        <div class="dtc v-mid">
                          <span class="button-reset bg-blue pa2 white fr pv1">
                            {data.rates[currcency] * rateBase}
                          </span>
                        </div>
                      </article>
                    ))}
                </div>
                <div class="tc">Lastest update {data.date}</div>
              </div>
            ) : (
              <div class="tc">Loading...</div>
            )}
          </div>
        </article>
      </section>
    </div>
  );
}

export default App;
