"# chrome_hotkey_extension"

隨手紀錄自己寫的chrome插件

1.背景功能

"background": {

    "service_worker": "event.js"

  }

主要是根據不同的hotkey執行

    a.英文單字查詢

    b.選取關鍵字輸入Javdb查詢

2.Javdb顯示優化

"javdb.js"

    修改magnet中的dn，丟進bitcomet時顯示自己想要的title (已被metatube取代，暫不更新)

    修改tag，支持一件呼叫並傳入magnet到Deluge或是linux 版 Bitcomet webpage

"javdb_rate.js"

    3.8分以上的影片，已顯目顏色提示

3.sehuatang優化

#很久沒用了，暫不更新


4.Bitcomet顯示優化

[bitcomet_web.js](https://github.com/WengTzu/chrome_hotkey_extension/blob/main/bitcomet_web.js "bitcomet_web.js")

    bitcomet的web(/panel/task_list)介面，重複番號的頁面標示同一個顏色
