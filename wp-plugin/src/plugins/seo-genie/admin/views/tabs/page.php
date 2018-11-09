<div id="page_keywords_navigation">
    <h2 class="nav-tab-wrapper current">
        <?php
        foreach ($keywords as $key => $keyword) { 
        ?>
            <a class="nav-tab" href="javascript:;"><?php echo $keyword->text; ?></a>
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
    <div class="inside">
        <input type="text" name="">
        <button class="btn btn-primary">Add</button>
    </div>
</div>