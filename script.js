jQuery(document).ready(function() {

    function getStaffId(id) {
        var sep_char_index = id.lastIndexOf(':');
        if (sep_char_index !== -1) {
            return id.substring(id.length, sep_char_index+1);
        }
        return id;
    }

    function drawChart(rows, container) {
        var data = new google.visualization.DataTable();
        data.addColumn('string', 'Name');
        data.addColumn('string', 'Manager');
        data.addRows(rows);
        var chart = new google.visualization.OrgChart(container);
        chart.draw(data, {allowHtml:true, allowCollapse: true, size: 'medium'});
    }

    if (typeof google !== 'undefined') {
        jQuery('table.orgchart, .wrap_orgchart table').each(function(){
            var staff = [];
            var $orgchart = jQuery(this);
            var includelinks = $orgchart.hasClass('includelinks');

            jQuery('tr', $orgchart).not(':first').each(function(i){
                var $row = jQuery(this);
                var id, name, title, manager, photo = '';
                var name_detail = {};

                jQuery('td', $row).each(function(j){
                    var $this = jQuery(this);
                    var $link = jQuery('a', $this);

                    switch(j) {
                        case 0:
                            name = $this.text().trim();
                            if ($link.length) {
                                if (includelinks) {
                                    $link.removeClass('wikilink1');
                                    name = $this.html().trim();
                                }
                                id = getStaffId($link.attr('title'));
                            } else {
                                id = name.toLowerCase();
                            }
                            break;
                        case 1:
                            if ($link.length) {
                                manager = getStaffId($link.attr('title'));
                            } else {
                                manager = $this.text().trim().toLowerCase();
                            }
                            break;
                        case 2:
                            title = $this.text().trim();
                            break;
                        case 3:
                            photo = $this.html();
                            break;
                    }

                    name_detail.v = id;
                    name_detail.f = ' <strong>' + name + '</strong> ';
                    if (title) {
                        name_detail.f = name_detail.f + title;
                    }
                    if (photo) {
                        name_detail.f = photo + name_detail.f;
                    }
                });

                staff[i] = [name_detail, manager];
            });

            google.setOnLoadCallback(function(){
                drawChart(staff, $orgchart.parent()[0]);
            });
        });
    }

});
