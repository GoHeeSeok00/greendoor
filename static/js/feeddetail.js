//댓글 수정 가능 함수
        function update_comment(id) {
            const commentInput = document.querySelector(`#comment_${id}_input`);
            const submitButton = document.querySelector(`#comment_update_api_${id}`);
            const updateButton = document.querySelector(`#comment_update_${id}`);

            updateButton.style.display = "none"; // 수정 버튼 숨기기
            submitButton.style.display = "inline-block"; // 전송 버튼 표시
            commentInput.readOnly = false; // 댓글 input 태그 수정 가능하게 변경
        }

                // 수정 댓글 전송 함수
        function update_comment_api(id) {
            const commentInput = document.querySelector(`#comment_${id}_input`);
            const submitButton = document.querySelector(`#comment_update_api_${id}`);
            const updateButton = document.querySelector(`#comment_update_${id}`);
            const content = commentInput.value;
            // ajax 비동기 통신
            $.ajax({
                type: "POST", // request 전달 방식 (POST, GET 등)
                url: "{% url "feed:update_comment" %}", // api 요청 url
                headers: {//헤더에 csrf 토큰 추가
                    'X-CSRFToken': '{{ csrf_token }}'
                },
                data: {// json 형식으로 서버에 데이터 전달
                    'comment_id': id,
                    'content': content,
                },
                dataType: "json", // json 형식으로 데이터 주고 받기
                success: function (response) { // 통신 성공했을 때 호출 함수
                    //console.log(response.msg)
                    updateButton.style.display = "inline-block"; // 수정 버튼 표시
                    submitButton.style.display = "none"; // 전송 버튼 숨기기
                    commentInput.readOnly = true; // 댓글 수정 못하게 막기
                },
                error: function () { // 통신 실패했을 때 호출 함수
                    alert("댓글 수정 실패");
                },
            });
        }

        // 좋아요 함수
        function like_api(id) {
            // ajax 비동기 통신
            $.ajax({
                type: "POST", // request 전달 방식 (POST, GET 등)
                url: "{% url "feed:api_like" %}", // api 요청 url
                headers: {//헤더에 csrf 토큰 추가
                    'X-CSRFToken': '{{ csrf_token }}'
                },
                data: {// json 형식으로 서버에 데이터 전달
                    'feed_id': id,
                },
                dataType: "json", // json 형식으로 데이터 주고 받기
                success: function (response) { // 통신 성공했을 때 호출 함수
                    {#console.log(response.msg)#}
                    {#console.log(response.like_count)#}
                    if (response.msg === "좋아요") {
                        // like 버튼의 클래스를 변경(채워져 있는 하트) / jquery 문법
                        $('#heart-icon').attr("class", "fi fi-sr-heart")
                    } else if (response.msg === "좋아요 취소") {
                        // like 버튼의 클래스를 변경(비어있는 하트) / jquery 문법
                        $('#heart-icon').attr("class", "fi fi-rr-heart")
                    }
                    // 좋아요 숫자를 서버에서 전달받은 숫자로 변경 / jquert 문법
                    $("#like_count").text(`${response.like_count}명이 좋아합니다`);
                },
                error: function () { // 통신 실패했을 때 호출 함수
                    alert("로그인 시 이용 가능한 기능입니다 :)");
                },
            });
        }

        // 북마크 함수
        function bookmark_api(id) {
            // ajax 비동기 통신
            $.ajax({
                type: "POST", // request 전달 방식 (POST, GET 등)
                url: "{% url "feed:api_bookmark" %}", // api 요청 url
                headers: {//헤더에 csrf 토큰 추가
                    'X-CSRFToken': '{{ csrf_token }}'
                },
                data: {// json 형식으로 서버에 데이터 전달
                    'feed_id': id,
                },
                dataType: "json", // json 형식으로 데이터 주고 받기
                success: function (response) { // 통신 성공했을 때 호출 함수
                    {#console.log(response.msg)#}
                    if (response.msg === "북마크") {
                        // 북마크 버튼의 클래스를 변경 / jquery 문법
                        $('#bookmark-icon').attr("class", "fi fi-sr-bookmark")
                    } else if (response.msg === "북마크 취소") {
                        // 북마크 버튼의 클래스를 변경 / jquery 문법
                        $('#bookmark-icon').attr("class", "fi fi-rr-bookmark")
                    }
                },
                error: function () { // 통신 실패했을 때 호출 함수
                    alert("로그인 시 이용 가능한 기능입니다 :)");
                },
            });
        }