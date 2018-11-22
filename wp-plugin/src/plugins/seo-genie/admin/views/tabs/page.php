<div id="page_keywords_navigation">
    <h2 class="nav-tab-wrapper current">
        <?php
        foreach ($keywords as $key => $keyword) { 
        ?>
            <a class="nav-tab" href="javascript:;"><?php echo $keyword->text; ?> <i class="fa fa-close keyword-remove"></i></a>
        <?php
        }
        ?>
        <a class="nav-tab" href="javascript:;"><i class="fa fa-plus"></i> Add Keyword</a>
    </h2>
    <?php
    foreach ($keywords as $key => $keyword) { 
    ?>
        <div class="inside hidden">
            <div class="row">
                <div class="col-md-4">
                    <div id="keyword_chart_line<?php echo $key;?>"></div>
                </div>
                <div class="col-md-4">
                    <div id="keyword_chart_gauge<?php echo $key;?>"></div>
                </div>
                <div class="col-md-4">
                    <div id="keyword_chart_series<?php echo $key;?>"></div>
                </div>
            </div>
        </div>
    <?php
    }
    ?>
    <div class="inside hidden" style="min-height: 300px">
        <div class="row">
            <div class="col-md-6">
                <select class="keyword-picker" data-live-search="true" data-size="5">
                    <?php
                    foreach ($keywords as $key => $keyword) {
                    ?>
                        <option><?php echo $keyword->text; ?></option>
                    <?php
                    }
                    ?>
                </select>
            </div>
            <div class="col-md-6">
                <button type="button" class="btn btn-primary">Add</button>
            </div>
        </div>
    </div>
</div>