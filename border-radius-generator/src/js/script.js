$(function () {
    $(".copy-control").hide();
    $(".input-controller").on("keydown change", function (e) {
        let input = $(this);
        let object = $(".object");
        let valor = input.val();
        let id = input.attr('id');
        let keyCode = e.keyCode || e.which;
        let unit;

        if ($(".form-check-input:checked").attr('id') == 'porcentage') {
            unit = '%';
        } else {
            unit = 'px';
        }

        console.log(unit);
        if (id == 'tl') {
            object.css("border-top-left-radius", `${valor + unit}`);
        }
        if (id == 'tr') {
            object.css("border-top-right-radius", `${valor + unit}`);
        }
        if (id == 'br') {
            object.css("border-bottom-right-radius", `${valor + unit}`);
        }
        if (id == 'bl') {
            object.css("border-bottom-left-radius", `${valor + unit}`);
        }

        if (keyCode == 9) {
            e.preventDefault();
            let arr = input.closest('input').nextAll(':has(.input-controller):first').find('.input-controller');
            console.table(arr.prevObject);
        }
        $(".copy-control").show();
        $(".code-snippet").text(getCssCode());
    });
    $("#checkbox-background-image").change(function () {
        if ($(this).prop('checked')) {
            getRandomImage();
            $(this).css("background-size", "cover");
        } else {
            $('.object').css('background-image', 'none');
        }
    });

    let getCssCode = () => {
        let styles = "border-radius: " + $(".object").css("border-radius") + ";";
        return styles;
    }

    let getRandomImage = () => {
        var keyword = "mountain";
        $.getJSON("https://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?",
            {
                tags: keyword,
                tagmode: "any",
                format: "json"
            },
            function (data) {
                var rnd = Math.floor(Math.random() * data.items.length);

                var image_src = data.items[rnd]['media']['m'].replace("_m", "_b");

                $(".object").css({ "background-image": "url('" + image_src + "')" });
            });
    }

    let getRandomFavicon = () => {
        $.getJSON('src/js/emojis.json', function (data) {
            let count = 0;
            for (let i in data) {
                count = count + 1
            }
            let randomNumber = Math.floor(Math.random() * (count - 1));
            $("#favicon").prop("href", "data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>" + data[randomNumber].emoji + "</text></svg>");
        });
    }

    getRandomFavicon();

    var clipboard = new ClipboardJS('.copy-clipboard');
});

