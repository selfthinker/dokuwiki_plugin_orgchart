<?php
/**
 * DokuWiki Action Plugin OrgChart
 *
 * @license    GPL 2 (http://www.gnu.org/licenses/gpl.html)
 * @author     Anika Henke <anika@selfthinker.org>
 */
// must be run within Dokuwiki
if(!defined('DOKU_INC')) die();

if(!defined('DOKU_PLUGIN')) define('DOKU_PLUGIN', DOKU_INC.'lib/plugins/');
if(!defined('DOKU_LF')) define('DOKU_LF', "\n");

require_once(DOKU_PLUGIN.'action.php');

/**
 * All DokuWiki plugins to interfere with the event system
 * need to inherit from this class
 */
class action_plugin_orgchart extends DokuWiki_Action_Plugin {

    // register hook
    function register(&$controller) {
        $controller->register_hook('TPL_METAHEADER_OUTPUT','BEFORE', $this, '_addJavascript');
    }

    /**
     * Add JavaScript for Google's Org Chart
     *
     * @param unknown_type $event
     * @param unknown_type $param
     */
    function _addJavascript(&$event, $param) {
        $event->data['script'][] = array(
            'charset' => 'utf-8',
            '_data'   => '',
            'src'     => 'https://www.google.com/jsapi'
        );
        $event->data['script'][] = array(
            'charset' => 'utf-8',
            '_data'   => 'google.load("visualization", "1", {packages:["orgchart"]});'
        );
    }

}

// vim:ts=4:sw=4:
