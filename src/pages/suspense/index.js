import React from 'react';

// 该组件是动态加载的
const LazyComponent = React.lazy(() => import('./Lazy'));

const Spinner = () => <div>waiting... i am Spinner Component</div>;

const Suspense = () => {
  // 显示 <Spinner> 组件直至 OtherComponent 加载完
  return (
    <React.Suspense fallback={<Spinner />}>
      <div>
        <LazyComponent />
      </div>
    </React.Suspense>
  );
};

export default Suspense;
