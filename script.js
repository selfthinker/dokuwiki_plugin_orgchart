jQuery(document).ready(function() {

    var staff = [];

    function getStaffId(id) {
        var sep_char_index = id.lastIndexOf(':');
        if (sep_char_index !== -1) {
            return id.substring(id.length, sep_char_index+1);
        }
        return id;
    }

    $orgchart = jQuery('table.orgchart, .wrap_orgchart table');
    if ($orgchart.length && (typeof google !== 'undefined')) {
        jQuery('tr', $orgchart).not(':first').each(function(i){
            $row = jQuery(this);
            var id, name, title, manager, photo = '';
            var name_detail = {};
            jQuery('td', $row).each(function(j){
                $this = jQuery(this);
                switch(j) {
                    case 0:
                        name = $this.text().trim();
                        var $link = jQuery('a', $this);
                        if ($link.length) {
                            if ($orgchart.hasClass('includelinks')) {
                                $link.removeClass('wikilink1');
                                name = $this.html().trim();
                            }
                            id = getStaffId($link.attr('title'));
                        } else {
                            id = name.toLowerCase();
                        }
                        break;
                    case 1:
                        var $link = jQuery('a', $this);
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

        var $orgChartContainer = $orgchart.parent();

        function drawChart() {
            var data = new google.visualization.DataTable();
            data.addColumn('string', 'Name');
            data.addColumn('string', 'Manager');
            data.addRows(staff);
            var chart = new google.visualization.OrgChart($orgChartContainer[0]);
            chart.draw(data, {allowHtml:true, allowCollapse: true, size: 'medium'});
        }
        google.setOnLoadCallback(drawChart);
    }

});
