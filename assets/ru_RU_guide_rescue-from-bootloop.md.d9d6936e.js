import{_ as o,o as e,c as a,O as t}from"./chunks/framework.43781440.js";const m=JSON.parse('{"title":"Выход из циклической загрузки","description":"","frontmatter":{},"headers":[],"relativePath":"ru_RU/guide/rescue-from-bootloop.md","filePath":"ru_RU/guide/rescue-from-bootloop.md"}'),r={name:"ru_RU/guide/rescue-from-bootloop.md"},l=t('<h1 id="intruduction" tabindex="-1">Выход из циклической загрузки <a class="header-anchor" href="#intruduction" aria-label="Permalink to &quot;Выход из циклической загрузки {#intruduction}&quot;">​</a></h1><p>При прошивке устройства могут возникать ситуации, когда устройство становится &quot;окирпиченным&quot;. Теоретически, если использовать fastboot только для прошивки загрузочного раздела или установить неподходящие модули, из-за которых устройство не загружается, то это можно восстановить соответствующими операциями. В данном документе описаны некоторые экстренные методы восстановления работоспособности &quot;окирпиченного&quot; устройства.</p><h2 id="кирпич-путем-перепрошивки-загрузочного-раздела" tabindex="-1">Кирпич путем перепрошивки загрузочного раздела <a class="header-anchor" href="#кирпич-путем-перепрошивки-загрузочного-раздела" aria-label="Permalink to &quot;Кирпич путем перепрошивки загрузочного раздела&quot;">​</a></h2><p>В KernelSU при прошивке загрузочного раздела могут возникнуть следующие ситуации:</p><ol><li>Загрузочный образ прошивается в неправильном формате. Например, если формат загрузки телефона - <code>gz</code>, а вы прошили образ в формате <code>lz4</code>, то телефон не сможет загрузиться.</li><li>Для корректной загрузки телефона необходимо отключить проверку AVB (обычно для этого требуется стереть все данные на телефоне).</li><li>Ядро содержит ошибки или не подходит для прошивки телефона.</li></ol><p>Независимо от ситуации, восстановить работоспособность можно путем <strong>прошивки стокового загрузочного образа</strong>. Поэтому в начале руководства по установке мы настоятельно рекомендуем создать резервную копию стокового загрузочного образа перед прошивкой. Если у вас нет резервной копии, вы можете получить оригинальную заводскую загрузку от других пользователей с таким же устройством, как у вас, или из официальной прошивки.</p><h2 id="окирпичивание-из-за-модулеи" tabindex="-1">Окирпичивание из-за модулей <a class="header-anchor" href="#окирпичивание-из-за-модулеи" aria-label="Permalink to &quot;Окирпичивание из-за модулей&quot;">​</a></h2><p>Установка модулей может быть более распространенной причиной окирпичивания устройства, но мы должны серьезно предупредить вас: <strong>Не устанавливайте модули из неизвестных источников</strong>! Поскольку модули обладают правами root, они могут нанести непоправимый ущерб вашему устройству!</p><h3 id="нормальные-модули" tabindex="-1">Нормальные модули <a class="header-anchor" href="#нормальные-модули" aria-label="Permalink to &quot;Нормальные модули&quot;">​</a></h3><p>Если вы прошили модуль, безопасность которого доказана, но он приводит к невозможности загрузки устройства, то такая ситуация легко восстанавливается в KernelSU без каких-либо проблем. KernelSU имеет встроенные механизмы для спасения устройства, в том числе следующие:</p><ol><li>Обновление AB</li><li>Восстановление при нажатии клавиши уменьшения громкости</li></ol><h4 id="ab-update" tabindex="-1">AB-обновление <a class="header-anchor" href="#ab-update" aria-label="Permalink to &quot;AB-обновление {#ab-update}&quot;">​</a></h4><p>Механизм обновления модулей в KernelSU основан на механизме AB-обновления, используемом в OTA-обновлениях системы Android. При установке нового модуля или обновлении существующего он не будет напрямую изменять текущий файл модуля. Вместо этого все модули будут встроены в другой образ обновления. После перезагрузки системы она попытается начать использовать этот образ обновления. Если система Android успешно загрузится, то модули будут действительно обновлены.</p><p>Поэтому самым простым и наиболее часто используемым методом спасения устройства является <strong>принудительная перезагрузка</strong>. Если после прошивки модуля не удается запустить систему, можно нажать и удерживать кнопку питания более 10 секунд, после чего система автоматически перезагрузится; после перезагрузки произойдет откат к состоянию до обновления модуля, а ранее обновленные модули будут автоматически отключены.</p><h4 id="volume-down" tabindex="-1">Спасение, с зажатой клавишей уменьшения громкости <a class="header-anchor" href="#volume-down" aria-label="Permalink to &quot;Спасение, с зажатой клавишей уменьшения громкости {#volume-down}&quot;">​</a></h4><p>Если обновление AB не помогло решить проблему, можно попробовать использовать <strong>Безопасный режим</strong>. В безопасном режиме все модули отключены.</p><p>Войти в безопасный режим можно двумя способами:</p><ol><li>Встроенный безопасный режим некоторых систем; некоторые системы имеют встроенный безопасный режим, доступ к которому осуществляется долгим нажатием кнопки уменьшения громкости, в то время как другие (например, MIUI) могут включить безопасный режим в Recovery. При входе в безопасный режим системы KernelSU также переходит в безопасный режим и автоматически отключает модули.</li><li>Встроенный безопасный режим KernelSU; метод работы заключается в том, что после первого экрана загрузки необходимо <strong>непрерывно нажать клавишу уменьшения громкости более трех раз</strong>. Обратите внимание, что именно нажать-отпустить, нажать-отпустить, нажать-отпустить, а не нажать и удерживать.</li></ol><p>После входа в безопасный режим все модули на странице модулей менеджера KernelSU Manager отключаются, но можно выполнить операцию &quot;деинсталляция&quot; для удаления модулей, которые могут вызывать проблемы.</p><p>Встроенный безопасный режим реализован в ядре, поэтому вероятность пропуска ключевых событий из-за перехвата исключена. Однако для ядер, отличных от ГКИ, может потребоваться ручная интеграция кода, и за рекомендациями можно обратиться к официальной документации.</p><h3 id="вредоносные-модули" tabindex="-1">Вредоносные модули <a class="header-anchor" href="#вредоносные-модули" aria-label="Permalink to &quot;Вредоносные модули&quot;">​</a></h3><p>Если описанные выше способы не помогли спасти устройство, то высока вероятность того, что установленный модуль имеет вредоносные операции или повредил устройство иным способом. В этом случае есть только два варианта:</p><ol><li>Стереть данные и прошить официальную систему.</li><li>Обратиться в сервисную службу.</li></ol>',23),i=[l];function n(d,s,u,c,p,h){return e(),a("div",null,i)}const b=o(r,[["render",n]]);export{m as __pageData,b as default};
