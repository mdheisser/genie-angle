<?php

/**
 * Provide a admin area view for the plugin
 *
 * This file is used to markup the admin-facing aspects of the plugin.
 *
 * @link       http://seogenie/dev-marko
 * @since      1.0.0
 *
 * @package    Seo_Genie
 * @subpackage Seo_Genie/admin/partials
 */
?>

<!-- This file should primarily consist of HTML with a little bit of PHP. -->
<div class="wrap" data-ng-app="seogenie">

	<div data-ng-class="{ 'layout-fixed' : app.layout.isFixed, 'aside-collapsed' : app.layout.isCollapsed, 'layout-boxed' : app.layout.isBoxed, 'layout-fs': app.useFullLayout, 'hidden-footer': app.hiddenFooter, 'layout-h': app.layout.horizontal, 'aside-float': app.layout.isFloat, 'offsidebar-open': app.offsidebarOpen, 'aside-toggled': app.asideToggled, 'aside-collapsed-text': app.layout.isCollapsedText}">
		<div data-preloader="data-preloader"></div>
		<div class="wrapper" data-ui-view="" data-autoscroll="false"></div>
	</div>

</div>
