$(document).ready(function(){
    $('button').click(function(){
        if($('input').val().length == 0){
        return swal('', 'Mohon masukkan nama negara terlebih dahulu', 'warning');
        }
        var countryName = $('input').val().toLowerCase();
        swal({
            title: "",
            text: "Mencari data . . .",
            icon: "https://c.tenor.com/I6kN-6X7nhAAAAAj/loading-buffering.gift"
        });

        $.ajax({
            "url": "https://covid-193.p.rapidapi.com/statistics",
            "method": "GET",
            "data": {
                country: countryName,
            },
            "headers": {
                "X-RapidAPI-Host": "covid-193.p.rapidapi.com",
                "X-RapidAPI-Key": "669547ef8emshd91fd2109141697p102694jsnd77b53f9712a"
            },
        }).done((res)=>{
            swal.close()
            if(res.response.length == 0){
                return swal('Data tidak ditemukan', 'Pastikan nama negara yang dituliskan benar', 'warning');
            }
            var data = res.response[0].cases;
            // mengupadate informasi yang ditampilkan pada DOM
            function formatNumber(number) {
                return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
            }
            $('.active-case').text(formatNumber(data.active));
            $('.critical-case').text(formatNumber(data.critical));
            $('.new-case').text(formatNumber(data.new));
            $('.recovered').text(formatNumber(data.recovered));

            // Menuliskan nama negara dengan huruf kapital
            var newCountryName = countryName.charAt(0).toUpperCase() + countryName.slice(1);
            $('.nama-negara').text(newCountryName);
            $('.card-statistik').show();
        });
    });
});
