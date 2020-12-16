import './Articles.scss';

function Articles() {
  return (
    <div className="articles">
      <h1>Articles list page</h1>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sed tempor sapien. Suspendisse tellus lorem, tempus ac orci in</p>
      <div className="articles__list">
        <div className="articles__list__item">
          1
        </div>
        <div className="articles__list__item">
          2
        </div>
        <div className="articles__list__item">
          3
        </div>
      </div>
    </div>
  );
}

export default Articles;