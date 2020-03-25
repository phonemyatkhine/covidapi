var Alldata;
function callData()
{
    var state = document.getElementById("stateDivision").value;
    $.get('/contact/list/'+state,function(data)
    {
        console.log(state);
        Alldata =data;
        console.log(data);
        
    });
}

function refreshTable()
{
    $(document).ready( function () {
        $('#table_id').DataTable(
            {
                data:Alldata
            }
        );
    } );
}