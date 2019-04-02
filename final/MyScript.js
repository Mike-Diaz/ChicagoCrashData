var uriCrash = 'api/Crash/';
var uriPeople = 'api/People';
var uriCauses = 'api/QueryByCauses/';
var uriAgeSex = 'api/QueryByAgeSex/';

var cBoxPrimeCause;
var cBoxInjury;
var cBoxPersonType;

const CRASHTABLE = "#crashTable";

// On success, 'data' contains a list of products.​
cBoxPrimeCause = $('<select name="jsPrimeCause" id="jsPrimeCause" />');
cBoxInjury = $('<select name="jsInjury" id="jsInjury" />');

$.get('/Docs/Causes.txt', {}, function (content) {
    let CAUSES = content.split('\n');
    // Add a list item for the PrimeCause of the crash.​
    for (let i = 0; i < CAUSES.length; i++) {
        cBoxPrimeCause.append('<option value="' + CAUSES[i] + '">' + CAUSES[i] + '</option>');
    }    
    $('#htmlCBoxPrimeCause').html(cBoxPrimeCause);
});
$.get('/Docs/Injuries.txt', {}, function (content) {
    let INJURIES = content.split('\n');
    for (let i = 0; i < INJURIES.length; i++) {
        cBoxInjury.append('<option value="' + INJURIES[i] + '">' + INJURIES[i] + '</option>');
    }
    $('#htmlCBoxInjury').html(cBoxInjury);
});
$.get('/Docs/Sexes.txt', {}, function (content) {
    let SEXES = content.split('\n');
});


$(document).ready(function () {
    // =======================================================================
    // GET 1ST QUERY - WHAT KIND OF ACCIDENTS INVOLVED X INJURY AND HOW MANY?
    // =======================================================================

    // STUBBED CHOICE VARIABLE
    var selectedInjury = 'INCAPACITATING INJURY';

    $.getJSON(uriCrash + selectedInjury)
        .done(function (data) {
            $.each(data, function (key, crash) {
                
                // populate the table in the HTML
                $('<li>', { text: formatCrashReport(crash) }).appendTo($('#crashTable'));
            });
        });

    // =======================================================================
    // GET 2ND QUERY - HOW MANY ACCIDENTS OF X CAUSE?
    // =======================================================================

    // STUBBED CHOICE VARIABLE
    var selectedCause = 'ANIMAL';
    let placeholder = 'foo';
    $.getJSON(uriCauses + selectedCause + '/' + placeholder)
        .done(function (data) {
            $.each(data, function (key, query2) {
                // populate the table in the HTML
                $('<li>', { text: formatQuery2Report(query2) }).appendTo($('#query2Table'));
            });
        });

    // =======================================================================
    // GET 3rd QUERY - HOW MANY ACCIDENTS FOR M/F/X by AGE RANGE yMin to yMax?
    // =======================================================================
    // STUBBED CHOICE VARIABLES
    let ageMin = 0;
    let ageMax = 100;
    let sex = 'M';
    $.getJSON(uriAgeSex + ageMin + '/' + ageMax + '/' + sex)
        .done(function (data) {
            $.each(data, function (key, query3) {
                // populate the table in the HTML
                $('<li>', { text: formatQuery3Report(query3) }).appendTo($('#query3Table'));
            });
        });

    $(function () {
        var $select = $(".1-100");
        for (i = 1; i <= 120; i++) {
            $select.append($('<option></option>').val(i).html(i))
        }
    });
});


function formatCrashReport(item) {
    return 'PrimeCause: ' + item.PrimeContributingCause + ';   NumberInjuries: ' + item.NumberInjuries;
}

function formatQuery2Report(item) {
    return 'Selected Cause: ' + item.PrimeContributingCause + '; Number of Accidents: ' + item.NumberAccidents;
}

function formatPersonReport(item) {
    return 'PersonID: ' + item.PersonID + ';   RD_NO: ' + item.RD_NO + ';   Person Type: ' + item.PersonType + ';   Age: ' + item.Age + ';   Sex: ' + item.Sex;
}

function formatQuery3Report(item) {
    return 'Age: ' + item.Age + '; Sex: ' + item.Sex + '; NumberAccidents: ' + item.NumberAccidents;
}

function GetShowData(pUri, tableName, formatItemType) {
    console.log(pUri, tableName);
    $.getJSON(pUri)
        .done(function (data) {
            // On success, 'data' contains a list of products.​
            $.each(data, function (key, item) {
                // Add a list item for the product.​
                $('<li>', { text: formatItemType(item) }).appendTo($(tableName));
            });
        });
}

function filterInjury() {
    $('#crashTable').empty();

    var selectedInjury = document.getElementById("jsInjury").value;

    console.log(selectedInjury);

    $.getJSON(uriCrash + selectedInjury)
        .done(function (data) {
            $.each(data, function (key, crash) {

                // populate the table in the HTML
                $('<li>', { text: formatCrashReport(crash) }).appendTo($('#crashTable'));
            });
        });
}

function filterPrimaryCause() {
    $('#query2Table').empty();

    var selectedCause = document.getElementById("jsPrimeCause").value;
    let placeholder = 'foo';

    $.getJSON(uriCauses + selectedCause + '/' + placeholder)
        .done(function (data) {
            $.each(data, function (key, query2) {
                // populate the table in the HTML
                $('<li>', { text: formatQuery2Report(query2) }).appendTo($('#query2Table'));
            });
        });
}

function filterAgeSex() {
    $('#query3Table').empty();

    var selectedAgeMin = $('#minAge :selected').text();
    var selectedAgeMax = $('#maxAge :selected').text();
    var selectedSex = $('input[name=chooseone]:checked').val();

    if (selectedSex == 'U') {
        $.getJSON(uriAgeSex + selectedAgeMin + '/' + selectedAgeMax + '/' + 'U')
            .done(function (data) {
                $.each(data, function (key, query3) {
                    // populate the table in the HTML
                    $('<li>', { text: formatQuery3Report(query3) }).appendTo($('#query3Table'));
                });
            });
        $.getJSON(uriAgeSex + selectedAgeMin + '/' + selectedAgeMax + '/' + 'X')
            .done(function (data) {
                $.each(data, function (key, query3) {
                    // populate the table in the HTML
                    $('<li>', { text: formatQuery3Report(query3) }).appendTo($('#query3Table'));
                });
            });
        $.getJSON(uriAgeSex + selectedAgeMin + '/' + selectedAgeMax + '/' + 'NULL')
            .done(function (data) {
                $.each(data, function (key, query3) {
                    // populate the table in the HTML
                    $('<li>', { text: formatQuery3Report(query3) }).appendTo($('#query3Table'));
                });
            });
    }

    else {
        $.getJSON(uriAgeSex + selectedAgeMin + '/' + selectedAgeMax + '/' + selectedSex)
            .done(function (data) {
                $.each(data, function (key, query3) {
                    // populate the table in the HTML
                    $('<li>', { text: formatQuery3Report(query3) }).appendTo($('#query3Table'));
                });
            });
    }
}