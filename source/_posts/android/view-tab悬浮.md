---
title: tab悬浮效果实现
date: 2017-08-30 17:16:15
toc: true
comments: true
tags:
- android
---

## tab悬浮效果实现

一种解决方式是使用开源库（如果布局嵌套很复杂，则不一定适合）：https://github.com/carlonzo/StikkyHeader

另一种解决思路：
- 在布局中，使用一个同tab1完全一样的tab2（并设置显示属性为gone）；
- 获取 tab1 到外层父视图顶部的距离（通过`tab1.getTop()`获取）；
- 当滚动的距离超过这个距离时，让外层的tab2显示出来，否则隐藏tab2；（即：`(scrollY - tab1.getTop()) > 0`）
- tab1 和 tab2 在逻辑上做相同的变化；

    ```xml
    <FrameLayout>
        <ScrollTabView>
          <LinearLayout>
            <...>
            <tab1>
            <...>
          </LinearLayout>
        </ScrollTabView>
    
        <tab2 visibility="gone">
    </FrameLayout>
    ```
    
    ```java
    // 重写ScrollView
    // 参考资料：http://www.jianshu.com/p/8ee4b0896b22
    // https://github.com/aohanyao/Advanced/blob/master/code/CustomView/ScollTabView/app/src/main/java/aohanyao/com/scolltabview/ScrollLevitateTabView.java
    public class ScrollTabView extends ScrollView {
        OnScrollListener mOnScrollListener;
    
        public ScrollTabView(Context context) {
            this(context, null);
        }
    
        public ScrollTabView(Context context, AttributeSet attrs) {
            this(context, attrs, 0);
        }
    
        public ScrollTabView(Context context, AttributeSet attrs, int defStyleAttr) {
            super(context, attrs, defStyleAttr);
            setUp();
        }
    
        public void setOnScrollListener(OnScrollListener onScrollListener) {
            mOnScrollListener = onScrollListener;
        }
    
        private void setUp() {
            if (mOnScrollListener == null) {
                return;
            }
    
            getViewTreeObserver().addOnGlobalLayoutListener(new ViewTreeObserver.OnGlobalLayoutListener() {
                @Override
                public void onGlobalLayout() {
                    mOnScrollListener.onScroll(getScrollY());
                }
            });
        }
    
        @Override
        protected void onScrollChanged(int l, int t, int oldl, int oldt) {
            if (mOnScrollListener != null) {
                mOnScrollListener.onScroll(t);
            }
            super.onScrollChanged(l, t, oldl, oldt);
        }
    
        public interface OnScrollListener {
            void onScroll(int scrollY);
        }
    }
    
    // 运用
    ScrollTabView scrollTabView = (ScrollTabView) mView.findViewById(R.id.scroll_tab_view);
    scrollTabView.setOnScrollListener(new ScrollTabView.OnScrollListener() {
        @Override
        public void onScroll(int scrollY) {
            // ScrollView的高度变化决定了tab2的显示与否
            int deltaY = scrollY - tab1.getTop();
            tab2.setVisibility(deltaY > 0 ? View.VISIBLE : View.GONE);
        }
    });
    ```