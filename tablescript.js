let draw = false;





$(document).ready(function() {

  


  $.get('Reading.csv', function(csvFile){






  var dataSet1 =  parseCSV(csvFile);


    
  
 
  
  $('#example tfoot th').each( function () {
    var title = $('#example thead th').eq( $(this).index() ).text();
    $(this).html( '<input type="text" class="form-control form-control-sm" placeholder="Search '+title+'" />' );
} );

  
  // initialize DataTables
  const table = $('#example').DataTable({
    dom: 'lBfrtip',
    data: dataSet1,
    
    responsive: true,
    rowReorder: {
      selector: 'td:nth-child(2)'
    } ,
    // orderCellsTop: true,
    // fixedHeader: true,
    "scrollY":        "50vh",
    // "scrollCollapse": true,

    // pageResize: true,
    columns: [
        { title: "N " },
        { title: "R " },
        { title: "T " },
        { title: "D " },
        { title: "L " }
      
    ],
   
        buttons: [

          {
            extend: 'collection',
            text: 'Export',
            buttons: [
                'copy',
                'excel',
                'csv',
                'pdf',
                'print'
            ]
          }]
              
});

$("#example tfoot input").on( 'keyup change', function () {
  table
      .column( $(this).parent().index()+':visible' )
      .search( this.value )
      .draw();
} );


  

// table.buttons().container().appendTo( $('.col-sm-6:eq(0)', table.table().container() ) );

  // get table data
  const tableData = getTableData(table);



  // create Highcharts
  createHighcharts(tableData);
  // table events
  setTableEvents(table);

});

});

function getTableData(table) {
  const dataArray = [],
  numberArray = [],
  readingArray = [];


  // loop table rows
  table.rows({ search: "applied" }).every(function () {

    const datas = this.data();

   
    console.log(datas);
    

    numberArray.push(datas[0]);
    readingArray.push(parseInt(datas[1].replace(/\,/g, "")));
    // densityArray.push(parseInt(datas[2].replace(/\,/g, "")));




  });

  

  // store all data in dataArray
  // dataArray.push(numberArray, readingArray, densityArray);
  dataArray.push(numberArray, readingArray);

  return dataArray;
}

function createHighcharts(data) {

  Highcharts.setOptions({
    lang: {
      thousandsSep: "," } });



  Highcharts.chart("chart", {
    reflow: true,
    title: {
      text: "Carbon Monoxide Readings " },

    // subtitle: {
    //   text: "Data from worldometers.info" },

    xAxis: [
    {
      categories: data[0],
      labels: {
        rotation: -45 } }],



    yAxis: [
    {
      // first yaxis
      title: {
        text: "CO Level" } },


    // {
    //   // secondary yaxis
    //   title: {
    //     text: "Density (P/Km²)" },

    //   min: 0,
    //   opposite: true }
    ],


    series: [
    {
      name: "CO Reading",
      color: "#0071A7",
      type: "column",
      data: data[1],
      tooltip: {
      valueSuffix: " PPM" } },
    ],


    tooltip: {
      shared: true },

    legend: {
      backgroundColor: "#ececec",
      shadow: true },

    credits: {
      enabled: false },

    noData: {
      style: {
        fontSize: "16px" } } });



}

function setTableEvents(table) {
  // listen for page clicks
  table.on("page", () => {
    draw = true;
  });

  // listen for updates and adjust the chart accordingly
  table.on("draw", () => {
    if (draw) {
      draw = false;
    } else {
      const tableData = getTableData(table);
      createHighcharts(tableData);
    }
  });
}




function parseCSV(csvFile){
  var data = [];
  var wholeData = [];
  var lines = csvFile.split("\n");
  $.each(lines, function(lineNumber, line){
      if(lineNumber != 0){
          var fields = line.split(',');
          var reading = parseInt(fields[1]);
          // console.log("reading");
          // console.log(fields);
          // var time = fields[2];
          // var date = fields[3];
          // var location = fields[4];
          data.push(lineNumber,reading);

      }

      var rowsData = line.split(',');
     
      wholeData.push(rowsData);
       
     


  });

 

  return {
      array1: data,
      array2: wholeData
  };

}

function tableCreate(wholeData){

  
    var table_data ="";
    // table_data += '<thead>';
    for(var count = 0; count<wholeData.length; count++)
    {
     var cell_data = wholeData[count];
     table_data += '<tr>';
     for(var cell_count=0; cell_count<cell_data.length; cell_count++)
     {
      if(count === 0)
      {
      //  table_data += '<th>'+cell_data[cell_count]+'</th>';
      }
      else if(count==1){
        // table_data += '</thead>';
        table_data += '<tbody>';
      }

      else if(count!=0)
      {
       table_data += '<td>'+cell_data[cell_count]+'</td>';
      }


     }
     table_data += '</tr>';
    }
    table_data += '</tbody>';
    
    $('#employee_table').html(table_data);


    console.log(table_data);

}

function parseCSV(csvFile){
  
  var data = [];
  var lines = csvFile.split("\n");
  $.each(lines, function(lineNumber, line){
      if(lineNumber != 0){
          var fields = line.split(',');
         
         
          data.push(fields);

      }
  });

 
  data.pop();
 
  return data;

}

// const gra = function(min, max) {
//   return Math.random() * (max - min) + min;
// }
// const init = function(){
//   let items = document.querySelectorAll('section');
//   for (let i = 0; i < items.length; i++){
//       items[i].style.background = randomColor({luminosity: 'light'});
//   }
//   cssScrollSnapPolyfill()
// }
// init();




// <-->

$(document).ready(function() {
  let isOpen = false;
  let $windowWidth = $( window ).width();
  const $btnCollapse = $(".button-collapse");
  const $content = $('#content');
  
  $( window ).resize(function() {
  
  $windowWidth = $( window ).width();
  if($windowWidth > 1440) {
  $content.css('padding-left', '250px');
  if(isOpen) {
  $btnCollapse.css('left', '0');
  isOpen = false;
  }
  } else if($windowWidth < 530 && isOpen) { $btnCollapse.css('left', '0' ); $content.css('padding-left', '0' );
    $('#sidenav-overlay').css('display', 'block' ); $btnCollapse.trigger('click'); } else { if(!isOpen) {
    $content.css('padding-left', '0' ); } } }); // SideNav Button Initialization $btnCollapse.sideNav();
    $btnCollapse.on('click', ()=> {
    isOpen = !isOpen;
    if($windowWidth > 530) {
    const elPadding = isOpen ? '250px' : '0';
    $btnCollapse.css('left', elPadding);
    $content.css('padding-left', elPadding);
    $('#sidenav-overlay').css('display', 'none');
    } else {
    $('#sidenav-overlay').on('click', () => {
    isOpen = !isOpen;
    });
    }
    });
    $('#sidenav-overlay').on('click', () => {
    isOpen = !isOpen;
    });
    });