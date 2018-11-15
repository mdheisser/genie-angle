<div id="page_keywords_navigation">
    <h2 class="nav-tab-wrapper current">
        <?php
        foreach ($keywords as $key => $keyword) { 
        ?>
            <a class="nav-tab" href="javascript:;"><?php echo $keyword->text; ?> <i class="fa fa-close keyword-remove"></i></a>
        <?php
        }
        ?>
        <a class="nav-tab nav-tab-active" href="javascript:;"><i class="fa fa-plus"></i> Add Keyword</a>
    </h2>
    <?php
    foreach ($keywords as $key => $keyword) { 
    ?>
        <div class="inside hidden">
            <p><?php echo $keyword->text; ?></p>
        </div>
    <?php
    }
    ?>
    <div class="inside" style="min-height: 300px">
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
                <button class="btn btn-primary">Add</button>
            </div>
        </div>
    </div>
</div>