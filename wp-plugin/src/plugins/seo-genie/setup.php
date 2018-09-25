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
<div class="notice is-dismissible">

	<div id="seogenie_setup_wizard">
		<h3><i class="fa fa-bandcamp mr-2"></i><strong>Welcome to SEOgenie</strong></h3>
		<section>
			<h4 class="step-title"><strong>SEO Genie Automatically and dynamically optimize your website Pages!</strong></h4>
			<div style="overflow: auto;margin-bottom: 20px;">
				<img src="<?php echo plugin_dir_url( __FILE__ ) . 'images/jinie.png'; ?>" height='280' style='float: right;margin: 0 50px;'>
				<p><strong>SEOgenie utilize advanced artificial intelligence technology for automatic assignment (association) of the most effective Keywords (Phases) to the relevant website pages according to the Keyword significance and SEO promotion Suitability.</strong></p>
				<p><strong>This unique technology creates and automatic match between the Keywords and the relevant page content and metadata components for effective on page SEO implementation.</strong></p>
			</div>
			By clicking the <strong>Setup SEOgenie</strong> button, you agree to our fascinating <a href="#">Terms of Service</a> and to <a href="#">Privacy Policy</a>.
			<?php submit_button('Setup SEOgenie', 'primary','btn_setup_seogenie', TRUE); ?>
		</section>
		<h3><i class="fa fa-bar-chart mr-2"></i><strong>Target Keywords</strong></h3>
		<section>
			<h4 class="step-title"><strong>Enter Target Keywords to help your site grow</strong></h4>
			<div class="row">
				<div class="col-md-7">
					<textarea rows="10" class="form-control" placeholder="Keywords separated by commas"></textarea>
					<div class="row mt-3 pl-3 pr-3">
						<div class="input-tags">
							<input type="text" class="float-left form-control" placeholder="Tags">
							<img src="<?php echo plugin_dir_url( __FILE__ ) . 'public/images/outline-label-24px.svg'; ?>">
						</div>
						<button type="submit" class="arrow-button float-right"><span class="label">Add to list</span><span class="btn-arrow"></span></button>
					</div>
					<p class="mt-3"><strong>Monitored Search Engine</strong></p>
					<div class="row">
						<div class="col-sm-4">
							<select class="selectpicker dropup" id="search_gngine">
								<option data-icon="socicon-google" value="googleEngine">Google</option>
								<option data-icon="socicon-bing" value="bingEngine">Bing</option>
								<option data-icon="socicon-yahoo" value="yahooEngine">Yahoo</option>
							</select>
						</div>
						<div class="col-sm-8">
							<select class="selectpicker dropup" id="se_domains" data-size="8"></select>
						</div>
					</div>
				</div>
				<div class="col-md-5">
					<div class="row border-b ml-3 mr-3">
						<p class="float-left"><strong>Keywords to track</strong></p>
						<img src="<?php echo plugin_dir_url( __FILE__ ) . 'public/images/outline-delete-24px.svg'; ?>" class="float-right opacity-5">
						<img src="<?php echo plugin_dir_url( __FILE__ ) . 'public/images/outline-label-24px.svg'; ?>" class="float-right mr-2 opacity-5">
					</div>
					<div class="row border-b mt-2 ml-3 mr-3">
						<p class="float-left">rank tracker</p>
						<img src="<?php echo plugin_dir_url( __FILE__ ) . 'public/images/outline-delete-24px.svg'; ?>" class="float-right opacity-5">
						<img src="<?php echo plugin_dir_url( __FILE__ ) . 'public/images/outline-label-24px.svg'; ?>" class="float-right mr-2 opacity-5">
					</div>
					<div class="row ml-3 mr-3 add-keyword-group">
						<p>1 keyword x 3 locations = 3 tracked keywords</p>
						<button class="btn btn-warning form-control" id="btn_add_keywords">Add keywords</button>
					</div>
				</div>
			</div>
		</section>
		<h3><i class="fa fa-sitemap mr-2"></i><strong>Sitemap</strong></h3>
		<section>
			<h4 class="step-title"><strong>Sitemap & Content Submission</strong></h4>
			<div class="row" id="sitemap">
				<div class="col-md-6">
					<table>
						<tr>
							<td><i class="glyphicon socicon-google" style="font-size: 20px;"></i> Google</td>
							<td><img src="<?php echo plugin_dir_url( __FILE__ ) . 'public/images/green.png'; ?>" width=='20' height='25'> 84 / 81</td>
							<td><input type="checkbox" name="" class="lc-switch"></td>
						</tr>
						<tr>
							<td><i class="glyphicon socicon-yahoo" style="font-size: 20px;"></i> Yahoo</td>
							<td><img src="<?php echo plugin_dir_url( __FILE__ ) . 'public/images/red.png'; ?>" width=='20' height='25'> 84 / 81</td>
							<td><input type="checkbox" name="" class="lc-switch"></td>
						</tr>
						<tr>
							<td><i class="glyphicon socicon-bing" style="font-size: 20px;"></i> Bing</td>
							<td><img src="<?php echo plugin_dir_url( __FILE__ ) . 'public/images/yellow.png'; ?>" width=='20' height='25'> 84 / 81</td>
							<td><input type="checkbox" name="" class="lc-switch"></td>
						</tr>
						<tr>
							<td colspan="2">Publish SiteMap now to All Search Engine</td>
							<td><input type="checkbox" name="" class="lc-switch"></td>
						</tr>
						<tr>
							<td colspan="2">
								Name: Location : <a href="#">sitemap.xml</a>
								<img src="<?php echo plugin_dir_url( __FILE__ ) . 'public/images/green.png'; ?>" class='ml-2' width=='20' height='25'>
							</td>
							<td><input type="checkbox" name="" class="lc-switch"></td>
						</tr>
						<tr>
							<td colspan="2">Search Engine Automatic SiteMap</td>
							<td><input type="checkbox" name="" class="lc-switch"></td>
						</tr>
					</table>
					<button class="btn btn-success">Next</button>
				</div>
				<div class="col-md-6">
					<button class="btn btn-primary form-control">Connect to Google Anaytics</button>
				</div>
			</div>
		</section>
		<h3><i class="fa fa-list-alt mr-2"></i><strong>Finish</strong></h3>
		<section>
			<p>The next and previous buttons help you to navigate through your content.</p>
		</section>
	</div>

</div>
