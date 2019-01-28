---
title: RecyclerView相关
date: 2017-08-30 17:16:15
toc: true
comments: true
tags:
- android
---

## RecyclerView
- 针对多种类型的情况，可以创建多个 `ViewHolder`和设置多个 `type`

### 分页加载（加载更多）
> http://www.gadgetsaint.com/android/recyclerview-header-footer-pagination/#.WRwxJGh96Hs

*方案一：*
    ```java
    mRecyclerView.addOnScrollListener(new RecyclerView.OnScrollListener() {
        @Override
        public void onScrollStateChanged(RecyclerView recyclerView, int newState) {
            super.onScrollStateChanged(recyclerView, newState);
    
            int lastvisibleitemposition = mLayoutManager.findLastVisibleItemPosition();
    
            if (lastvisibleitemposition == mAdapter.getItemCount() - 1) {
    
                if (!loading && !isLastPage) {
    
                    loading = true;
                    fetchData((++pageCount));
                    // Increment the pagecount everytime we scroll to fetch data from the next page
                    // make loading = false once the data is loaded
                    // call mAdapter.notifyDataSetChanged() to refresh the Adapter and Layout
    
                }
    
    
            }
        }
    });
    ```

*方案二：*
    ```java
    // http://www.jianshu.com/p/4feb0c16d1b5
    private RecyclerView.OnScrollListener mListener = new RecyclerView.OnScrollListener() {
        @Override
        public void onScrollStateChanged(RecyclerView recyclerView, int newState) {
            super.onScrollStateChanged(recyclerView, newState);
        }
    
        @Override
        public void onScrolled(RecyclerView recyclerView, int dx, int dy) {
            super.onScrolled(recyclerView, dx, dy);
    
            LinearLayoutManager layoutManager = (LinearLayoutManager) recyclerView.getLayoutManager();
            int lastVisibleItem = layoutManager.findLastVisibleItemPosition();
            int totalItemCount = layoutManager.getItemCount();
    
            if (totalItemCount < 250 && lastVisibleItem >= totalItemCount - 4) {
                // 注意：要限制请求，否则请求太多次数，导致服务器崩溃或者服务器拒绝请求（罪过，罪过）。
                if (mIsLoading) {
                    Log.i(TAG, "onScrolled: " + "加载中---------");
                } else {
                    Log.i(TAG, "onScrolled: " + "加载更多了=======》");
                    loadSubject();
                }
    
            }
    
            Log.d(TAG, "onScrolled: lastVisibleItem=" + lastVisibleItem);
            Log.d(TAG, "onScrolled: totalItemCount=" + totalItemCount);
    
        }
    };
    ```

## GridLayoutManager 均分两列的装饰器ItemDecoration
    ```java
    @Override
    public void getItemOffsets(Rect outRect, View view, RecyclerView parent, RecyclerView.State state) {
        int position = parent.getChildLayoutPosition(view);
        if (position == 0 || position == 1) {
            outRect.top = offset;
        }
    
        outRect.bottom = offset;
        if (position % 2 == 1) {
            outRect.left = offset / 2;
            outRect.right = offset;
        } else {
            outRect.left = offset;
            outRect.right = offset / 2;
        }
    }
    ```    