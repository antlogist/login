import "webpack-jquery-ui";
import "webpack-jquery-ui/css";

export function initDatePickers() {
    $( ".datepicker" ).datepicker({
//        dateFormat : 'dd-mm-yy',
        defaultDate: new Date("04-01-1984")
    }); 
};