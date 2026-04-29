<div class="bg-grey-1 border border-grey-2 rounded-[4rem] px-8 pt-12 pb-18 space-y-12">
  <p class="text-center text-red">April 2026</p>

  <div class="days grid grid-cols-7 gap-x-4 gap-y-6">
    <div>
      <p>1</p>
    </div>
    <div class="active">
      <p>2</p>
    </div>
    <div>
      <p>3</p>
    </div>
    <div>
      <p>4</p>
    </div>
    <div>
      <p>5</p>
    </div>
    <div>
      <p>6</p>
    </div>
    <div>
      <p>7</p>
    </div>
    <div>
      <p>8</p>
    </div>
    <div class="active">
      <p>9</p>
    </div>
    <div class="active">
      <p>10</p>
    </div>
    <div>
      <p>11</p>
    </div>
    <div>
      <p>12</p>
    </div>
    <div>
      <p>13</p>
    </div>
    <div>
      <p>14</p>
    </div>
    <div>
      <p>15</p>
    </div>
    <div>
      <p>16</p>
    </div>
    <div class="active">
      <p>17</p>
    </div>
    <div>
      <p>18</p>
    </div>
    <div class="active">
      <p>19</p>
    </div>
    <div>
      <p>20</p>
    </div>
    <div class="active">
      <p>21</p>
    </div>
    <div>
      <p>22</p>
    </div>
    <div>
      <p>23</p>
    </div>
    <div>
      <p>24</p>
    </div>
    <div>
      <p>25</p>
    </div>
    <div>
      <p>26</p>
    </div>
    <div>
      <p>27</p>
    </div>
    <div>
      <p>28</p>
    </div>
    <div>
      <p>29</p>
    </div>
    <div>
      <p>30</p>
    </div>
    <div>
      <p>31</p>
    </div>
  </div>
</div>

<style>
  .days {
    & > div {
      display: flex;
      justify-content: center;

      & > p {
        width: 35px;
        height: 35px;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      &.active {
        & > p {
          background-color: var(--color-yellow);
        }
      }
    }
  }
</style>