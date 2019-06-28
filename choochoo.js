(function () {

    var firebaseConfig = {
        apiKey: "AIzaSyChxR9xfJhbZJoQxYoB-_2DT1UrlcazoJM",
        authDomain: "trainactivity-4105d.firebaseapp.com",
        databaseURL: "https://trainactivity-4105d.firebaseio.com",
        projectId: "trainactivity-4105d",
        storageBucket: "",
        messagingSenderId: "912422991992",
        appId: "1:912422991992:web:07febb90243eff0f"
    };

    // SUPPOSED to read firebase :( //

    firebase.initializeApp(firebaseConfig);

    var database = firebase.database();
    var ref = database.ref('trains/');

    function submitData() {

        event.preventDefault();

        var name = $('#name').val();

        var destination = $('#destination').val();

        var trainTime = $('#train-time').val();

        var frequency = $('#frequency').val();


        ref.push({
            name,
            destination,
            trainTime,
            frequency
        });


        $('form')[0].reset();

    }

    ref.on('child_added', function (snapshot, prevChildKey) {
        var name = snapshot.val().name;
        var destination = snapshot.val().destination;
        var trainTime = snapshot.val().trainTime;
        var frequency = snapshot.val().frequency;
        var now = moment();
        var trainUpdate = moment.duration(now.diff(trainTime))._data.frequency;

        var html = `<ul class="list-group list-group-horizontal" id="train-info">
        <li class="col card-body list-group-item">${name}</li>
        <li class="col card-body list-group-item">${destination}</li>
        <li class="col card-body list-group-item">${trainTime}</li>
        <li class="col card-body list-group-item">$${frequency}</li>
        <li class="col card-body list-group-item">$${trainUpdate}</li>
      </ul>`;

        $('#train-card').append(html);
    });

    $('.submit-btn').on('click', submitData);
})();